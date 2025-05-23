import { parseActivePathname } from "../../routes/url-parser";
import { showFormattedDate } from "../../utils";
import StoryPresenter from "../../utils/presenter/story.presenter";

export default class DetailPage {
    async render() {
        const { id } = parseActivePathname();
        this.id = id;

        return `
      <section class="container">
        <h1 class="p-1 m-0">Detail Story</h1>
        
        <div class="story-container">
          <div id="post-photo"></div>
          <div id="post-description"></div>
          <div id="map"></div>
        </div>
      </section>
    `;
    }

    async afterRender() {
        const storyPresenter = new StoryPresenter(this);
        storyPresenter.handleFetchStoryById(this.id);
    }

    loadMap(coordinates) {
        this.map = L.map('map').setView(coordinates, 8);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
    }

    async setLoading(isLoading) {
        
    }

    async loadStory(data) {
        document.getElementById("post-photo").innerHTML = `<img src="${data.photoUrl}" alt="${data.name}'s Photo">`;
        document.getElementById("post-description").innerHTML = `
            <p >${data.name}</p>
            <span class="d-block">${data.description}</span>
            <span>${showFormattedDate(data.createdAt)}</span>
        `;
        
        this.loadMap([data.lat, data.lon]);

        this.marker = L.marker([data.lat, data.lon]).addTo(this.map)
            .bindPopup(`<b>Description: </b><br />${data.description}`);
    }
}
