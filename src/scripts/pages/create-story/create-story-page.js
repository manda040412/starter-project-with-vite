import { isLogin } from "../../data/auth.api";
import StoryPresenter from "../../utils/presenter/story.presenter";

export default class CreateStoryPage {
    constructor() {
        this.stream = null;
        this.file = null;
    }

    async render() {
        if (!isLogin()) window.location = "/#/login";

        return `
            <div class="container">
                <h1 class="fs-2">Menambahkan Story</h1>
                <p>Tambahkan Story Kegiatan Sehari-harimu disini</p>
                
                <div class="py-3">
                    <form method="POST" enctype="multipart/form-data" id="story-form">
                        
                        <div class="form-group my-2">
                            <label class="form-label" for="description">Deskripsi</label>
                            <textarea type="text" id="description" class="form-control"></textarea>
                        </div>
                        
                        <div class="form-group my-2">
                            <label class="form-label">Foto</label>
                            <div class="d-flex gap-2 my-2">
                                <button class="btn btn-primary" id="playBtn">Play</button>
                                <button class="btn btn-danger" id="stopBtn">Stop</button>
                                <button class="btn btn-success" id="snapBtn">Take Picture</button>
                            </div>
                            
                            <div class="d-flex flex-wrap gap-2 d-block">
                                <video class="video col-md-5 col-12" id="video" autoplay playsinline></video>
                                <canvas class="col-md-5 col-12" id="photo-preview"></canvas>
                            </div>
                        </div>
                        
                        <div class="form-group my-2">
                            <label class="form-label">Map</label>
                            <div class="d-block col-6" id="map"></div>
                        </div>
                        
                        <button class="submit-btn col-12">Tambah Story</button>
                    </form>
                </div>
            </div>
        `;
    }

    async afterRender() {
        this.prepareEventListeners();
        this.startCamera();

        this.map = L.map('map').setView([0.7893, 113.9213], 8);
        const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.map.addLayer(layer);

        this.map.on('click', (e) => this.onMapClick(e));
    }

    prepareEventListeners() {
        document.getElementById("playBtn").addEventListener("click", (e) => {
            e.preventDefault();
            this.startCamera();
        });
        document.getElementById("stopBtn").addEventListener("click", (e) => {
            e.preventDefault();
            this.stopCamera()
        });
        document.getElementById("snapBtn").addEventListener("click", (e) => {
            e.preventDefault();
            this.takePicture()
        });

        document.getElementById("story-form").addEventListener("submit", (e) => {
            e.preventDefault();

            this.uploadStory();
        })
    }

    async startCamera() {
        try {
            if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
                this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
                document.getElementById("video").srcObject = this.stream;
            }
        } catch (err) {
            alert('Camera access failed: ' + err.message);
        }
    }

    stopCamera() {
        try {
            if (this.stream) {
                this.stream.getTracks().forEach(track => track.stop());
                document.getElementById("video").srcObject = null;
            }
        } catch (err) {
            alert("Gagal " + err.message);
        }
    }

    takePicture() {
        this.canvas = document.querySelector("canvas");

        const context = this.canvas.getContext('2d');
        this.canvas.width = video.videoWidth;
        this.canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);

        this.canvas.toBlob(async (blob) => {
            const file = new File([blob], "snapshot.png", { type: "image/png" });

            this.file = file;
        }, 'image/png')
    }

    onMapClick(e) {
        if (this.marker) this.map.removeLayer(this.marker);

        this.lat = e.latlng.lat;
        this.lng = e.latlng.lng;
        this.marker = new L.marker(e.latlng).addTo(this.map);
    }

    async uploadStory() {
        this.presenter = new StoryPresenter(this);

        const formData = new FormData();
        formData.append('description', document.getElementById("description").value);
        formData.append('photo', this.file);
        formData.append("lat", this.lat);
        formData.append("lon", this.lng);

        this.presenter.handlePostStory(formData);
    }

    setLoading(isLoading) {
        document.querySelector('.submit-btn').disabled = isLoading;

        if (isLoading) document.querySelector('.submit-btn').classList.add("disabled");
        else document.querySelector('.submit-btn').classList.remove("disabled");
    }

    redirectToHomePage() {
        window.location = "/";
    }
}