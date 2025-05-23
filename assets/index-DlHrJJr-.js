var M=t=>{throw TypeError(t)};var b=(t,e,n)=>e.has(t)||M("Cannot "+n);var c=(t,e,n)=>(b(t,e,"read from private field"),n?n.call(t):e.get(t)),p=(t,e,n)=>e.has(t)?M("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),f=(t,e,n,r)=>(b(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),O=(t,e,n)=>(b(t,e,"access private method"),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const g={BASE_URL:"https://story-api.dicoding.dev/v1"},Z=async(t,e,n)=>{const r=new Request(`${g.BASE_URL}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,password:n})}),s=await fetch(r),o=await s.json();if(!s.ok)throw new Error((o==null?void 0:o.message)??"Gagal register akun");return o},Q=async(t,e)=>{var o;const n=new Request(`${g.BASE_URL}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:e})}),r=await fetch(n),s=await r.json();if(!r.ok)throw new Error((s==null?void 0:s.message)??"Gagal masuk");return localStorage.setItem("token",(o=s==null?void 0:s.loginResult)==null?void 0:o.token),localStorage.setItem("user-data",JSON.stringify(s==null?void 0:s.loginResult)),document.getElementById("login-nav").classList.add("hidden"),document.getElementById("register-nav").classList.add("hidden"),document.getElementById("logout-button").classList.remove("hidden"),s},X=()=>{localStorage.removeItem("token"),document.getElementById("login-nav").classList.remove("hidden"),document.getElementById("register-nav").classList.remove("hidden"),document.getElementById("logout-button").classList.add("hidden"),window.location.hash="/login"},T=()=>!!localStorage.getItem("token"),U=()=>(T()||(window.location.hash="/login"),localStorage.getItem("token")??null),I=(t,e)=>e.some(n=>t instanceof n);let C,R;function ee(){return C||(C=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function te(){return R||(R=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const B=new WeakMap,E=new WeakMap,w=new WeakMap;function ne(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",o),t.removeEventListener("error",a)},o=()=>{n(m(t.result)),s()},a=()=>{r(t.error),s()};t.addEventListener("success",o),t.addEventListener("error",a)});return w.set(e,t),e}function se(t){if(B.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",o),t.removeEventListener("error",a),t.removeEventListener("abort",a)},o=()=>{n(),s()},a=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",o),t.addEventListener("error",a),t.addEventListener("abort",a)});B.set(t,e)}let P={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return B.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function F(t){P=t(P)}function re(t){return te().includes(t)?function(...e){return t.apply(k(this),e),m(this.request)}:function(...e){return m(t.apply(k(this),e))}}function oe(t){return typeof t=="function"?re(t):(t instanceof IDBTransaction&&se(t),I(t,ee())?new Proxy(t,P):t)}function m(t){if(t instanceof IDBRequest)return ne(t);if(E.has(t))return E.get(t);const e=oe(t);return e!==t&&(E.set(t,e),w.set(e,t)),e}const k=t=>w.get(t);function ae(t,e,{blocked:n,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(t,e),l=m(a);return r&&a.addEventListener("upgradeneeded",i=>{r(m(a.result),i.oldVersion,i.newVersion,m(a.transaction),i)}),n&&a.addEventListener("blocked",i=>n(i.oldVersion,i.newVersion,i)),l.then(i=>{o&&i.addEventListener("close",()=>o()),s&&i.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const ie=["get","getKey","getAll","getAllKeys","count"],ce=["put","add","delete","clear"],S=new Map;function $(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(S.get(e))return S.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=ce.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ie.includes(n)))return;const o=async function(a,...l){const i=this.transaction(a,s?"readwrite":"readonly");let u=i.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),s&&i.done]))[0]};return S.set(e,o),o}F(t=>({...t,get:(e,n,r)=>$(e,n)||t.get(e,n,r),has:(e,n)=>!!$(e,n)||t.has(e,n)}));const de=["continue","continuePrimaryKey","advance"],j={},D=new WeakMap,N=new WeakMap,le={get(t,e){if(!de.includes(e))return t[e];let n=j[e];return n||(n=j[e]=function(...r){D.set(this,N.get(this)[e](...r))}),n}};async function*ue(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,le);for(N.set(n,e),w.set(n,k(e));e;)yield n,e=await(D.get(n)||e.continue()),D.delete(n)}function q(t,e){return e===Symbol.asyncIterator&&I(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&I(t,[IDBIndex,IDBObjectStore])}F(t=>({...t,get(e,n,r){return q(e,n)?ue:t.get(e,n,r)},has(e,n){return q(e,n)||t.has(e,n)}}));const A=ae("life-story-db",1,{upgrade(t){t.createObjectStore("stories",{keyPath:"id"})}});async function me(t){await(await A).put("stories",t)}async function he(){return(await A).getAll("stories")}async function pe(t){await(await A).delete("stories",t)}function H(t,e="en-US",n={}){return new Date(t).toLocaleDateString(e,{year:"numeric",month:"long",day:"numeric",...n})}var V=U();const ye=async()=>{const t=U(),e=await fetch(`${g.BASE_URL}/stories?page=1&size=16&location=1`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}});if(!e.ok)throw new Error("Gagal mendapatkan data story");return e.json()},ge=async t=>{const e=await fetch(`${g.BASE_URL}/stories/${t}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${V}`}});if(!e.ok)throw new Error("Gagal mendapatkan data story");return e.json()},fe=async t=>{const e=new Request(`${g.BASE_URL}/stories`,{method:"POST",headers:{Authorization:`Bearer ${V}`},body:t}),n=await fetch(e);if(!n.ok)throw new Error("Gagal mendapatkan data story");return n.json()};class x{constructor(e){this.view=e}async handleFetchingStories(){try{this.view.setLoading(!0);const e=await ye();this.view.loadStories(e.listStory)}catch(e){console.error(e)}finally{this.view.setLoading(!1)}}async handleFetchStoryById(e){try{this.view.setLoading(!0);const n=await ge(e);this.view.loadStory(n.story)}catch(n){console.error(n)}finally{this.view.setLoading(!1)}}async handlePostStory(e){try{this.view.setLoading(!0);const n=await fe(e);this.view.redirectToHomePage()}catch(n){console.error(n.message)}finally{this.view.setLoading(!1)}}}class ve{async render(){return`
      <section class="container">
        <h1 class="p-1 m-0 d-flex justify-content-between align-items-dan">
          <span>List of Story</span>
          <a href="#main-content" class="fs-5" >Skip to main content</a>
        </h1>
        
        <div class="story-list-container">
          <p id="loading-text">Loading...</p>
          <p id="no-data-text" class="hidden">Tidak ada story</p>
          
          <div id="story-list" class="story-list d-flex flex-wrap"></div>
        </div>
      </section>
    `}async setLoading(e){e?document.getElementById("loading-text").classList.remove("hidden"):document.getElementById("loading-text").classList.add("hidden")}async loadStories(e){const n=document.getElementById("story-list");if(document.getElementById("no-data-text").classList.add("hidden"),e.length<1){document.getElementById("no-data-text").classList.remove("hidden");return}for(let s of e)n.innerHTML+=`
        <div class="col-sm-6 col-md-4 col-lg-3 col-12 p-1">
          <div class="card" data-id="${s.id}">
            <div class="card-content" style="background: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)), url(${s.photoUrl});">
              <p class="fs-5"><b>${s.name}</b></p>
              <span class="text-truncate">${s.description}</span>
              <span>${H(s.createdAt)}</span>
            </div>
          </div>
        </div>
      `;document.querySelectorAll(".card").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.id;this.openDetailPage(o)})})}async afterRender(){new x(this).handleFetchingStories()}openDetailPage(e){window.location.hash=`/detail/${e}`}}class we{async render(){return`
      <section class="container">
        <h1>About Page</h1>
      </section>
    `}async afterRender(){}}class _{constructor(e){this.view=e}async handleRegister({name:e,email:n,password:r}){try{this.view.setLoading(!0);const s=await Z(e,n,r);this.view.redirectToLoginPage()}catch(s){this.view.showError(s.message)}finally{this.view.setLoading(!1)}}async handleLogin({email:e,password:n}){try{this.view.setLoading(!0);const r=await Q(e,n);this.view.redirectToHomePage()}catch(r){this.view.showError(r.message)}finally{this.view.setLoading(!1)}}}class be{async render(){return`
            <div class="login-box">
                <h2>Selamat Datang</h2>
                <p>Silahkan login untuk melanjutkan!</p>
                <form id="login-form">
                    <div>
                        <label for="email">Email</label>

                        <input type="email" id="email" />
                    </div>
                    
                    <div class="password-wrapper my-2">
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                        </button>
                    </div>

                    <button type="submit" class="submit-btn">
                        Masuk
                    </button>
                    
                    <p id="error-msg" style="color: red; text-align: left;"></p>
                </form>
            </div>
        `}signUpAction(e){e.preventDefault(),this.presenter=new _(this);const n=document.getElementById("email").value,r=document.getElementById("password").value;this.presenter.handleLogin({email:n,password:r})}async afterRender(){document.getElementById("login-form").addEventListener("submit",this.signUpAction.bind(this))}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}showError(e){document.getElementById("error-msg").innerText=e}redirectToHomePage(){window.location.hash="/"}clearForm(){document.getElementById("login-form").reset()}}class Le{async render(){return`
            <div class="login-box">
                <h2>Selamat Datang</h2>
                <p>Silahkan daftarkan akun terlebih dahulu!</p>
                <form id="register-form">
                    <div>
                        <label for="name">Name</label>
                        <input type="text" id="name" />
                    </div>
                    
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" />
                    </div>
                    
                    <div class="password-wrapper">
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                    </div>

                    <button type="submit" class="submit-btn">
                        Daftar
                    </button>
                    
                    <p id="error-msg" style="color: red; text-align: left;"></p>
                </form>
            </div>
        `}signUpAction(e){e.preventDefault(),this.presenter=new _(this);const n=document.getElementById("name").value,r=document.getElementById("email").value,s=document.getElementById("password").value;this.presenter.handleRegister({name:n,email:r,password:s})}async afterRender(){document.getElementById("register-form").addEventListener("submit",this.signUpAction.bind(this))}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}showError(e){document.getElementById("error-msg").innerText=e}redirectToLoginPage(){window.location.hash="/login"}clearForm(){document.getElementById("register-form").reset()}}class Ee{constructor(){this.stream=null,this.file=null}async render(){return T()||(window.location="/#/login"),`
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
        `}async afterRender(){this.prepareEventListeners(),this.startCamera(),this.map=L.map("map").setView([.7893,113.9213],8);const e=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map);this.map.addLayer(e),this.map.on("click",n=>this.onMapClick(n))}prepareEventListeners(){document.getElementById("playBtn").addEventListener("click",e=>{e.preventDefault(),this.startCamera()}),document.getElementById("stopBtn").addEventListener("click",e=>{e.preventDefault(),this.stopCamera()}),document.getElementById("snapBtn").addEventListener("click",e=>{e.preventDefault(),this.takePicture()}),document.getElementById("story-form").addEventListener("submit",e=>{e.preventDefault(),this.uploadStory()})}async startCamera(){try{"mediaDevices"in navigator&&"getUserMedia"in navigator.mediaDevices&&(this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),document.getElementById("video").srcObject=this.stream)}catch(e){alert("Camera access failed: "+e.message)}}stopCamera(){try{this.stream&&(this.stream.getTracks().forEach(e=>e.stop()),document.getElementById("video").srcObject=null)}catch(e){alert("Gagal "+e.message)}}takePicture(){this.canvas=document.querySelector("canvas");const e=this.canvas.getContext("2d");this.canvas.width=video.videoWidth,this.canvas.height=video.videoHeight,e.drawImage(video,0,0,this.canvas.width,this.canvas.height),this.canvas.toBlob(async n=>{const r=new File([n],"snapshot.png",{type:"image/png"});this.file=r},"image/png")}onMapClick(e){this.marker&&this.map.removeLayer(this.marker),this.lat=e.latlng.lat,this.lng=e.latlng.lng,this.marker=new L.marker(e.latlng).addTo(this.map)}async uploadStory(){this.presenter=new x(this);const e=new FormData;e.append("description",document.getElementById("description").value),e.append("photo",this.file),e.append("lat",this.lat),e.append("lon",this.lng),this.presenter.handlePostStory(e)}setLoading(e){document.querySelector(".submit-btn").disabled=e,e?document.querySelector(".submit-btn").classList.add("disabled"):document.querySelector(".submit-btn").classList.remove("disabled")}redirectToHomePage(){window.location="/"}}function K(t){const e=t.split("/");return{resource:e[1]||null,id:e[2]||null}}function Se(t){let e="";return t.resource&&(e=e.concat(`/${t.resource}`)),t.id&&(e=e.concat("/:id")),e||"/"}function W(){return location.hash.replace("#","")||"/"}function G(){const t=W(),e=K(t);return Se(e)}function Ie(){const t=W();return K(t)}class Be{async render(){const{id:e}=Ie();return this.id=e,`
      <section class="container">
        <h1 class="p-1 m-0">Detail Story</h1>
        
        <div class="story-container">
          <div id="post-photo"></div>
          <div id="post-description"></div>
          <div id="map"></div>
        </div>
      </section>
    `}async afterRender(){new x(this).handleFetchStoryById(this.id)}loadMap(e){this.map=L.map("map").setView(e,8),L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(this.map)}async setLoading(e){}async loadStory(e){document.getElementById("post-photo").innerHTML=`<img src="${e.photoUrl}" alt="${e.name}'s Photo">`,document.getElementById("post-description").innerHTML=`
            <p >${e.name}</p>
            <span class="d-block">${e.description}</span>
            <span>${H(e.createdAt)}</span>
        `,this.loadMap([e.lat,e.lon]),this.marker=L.marker([e.lat,e.lon]).addTo(this.map).bindPopup(`<b>Description: </b><br />${e.description}`)}}const Pe={async render(){return`
      <section class="container">
        <h1>Story Offline</h1>
        <div id="offline-stories-list"></div>
      </section>
    `},async afterRender(){await z()}};async function z(){const t=await he(),e=document.getElementById("offline-stories-list");if(!t.length){e.innerHTML="<p>Tidak ada story offline.</p>";return}e.innerHTML=t.map(n=>`
    <div class="card my-2 p-2">
      <h3>${n.title}</h3>
      <p>${n.body}</p>
      <button class="btn btn-danger" onclick="deleteOfflineStory('${n.id}')">Hapus</button>
    </div>
  `).join("")}window.deleteOfflineStory=async function(t){await pe(t),alert("Story offline dihapus!"),z()};const J={"/":new ve,"/about":new we,"/login":new be,"/register":new Le,"/create-story":new Ee,"/detail/:id":new Be,"/offline-stories":Pe};var y,h,d,v,Y;class ke{constructor({navigationDrawer:e,drawerButton:n,content:r}){p(this,v);p(this,y,null);p(this,h,null);p(this,d,null);f(this,y,r),f(this,h,n),f(this,d,e),O(this,v,Y).call(this)}async renderPage(){const e=G(),n=J[e];c(this,y).innerHTML=await n.render(),await n.afterRender()}}y=new WeakMap,h=new WeakMap,d=new WeakMap,v=new WeakSet,Y=function(){c(this,h).addEventListener("click",()=>{c(this,d).classList.toggle("open")}),document.body.addEventListener("click",e=>{!c(this,d).contains(e.target)&&!c(this,h).contains(e.target)&&c(this,d).classList.remove("open"),c(this,d).querySelectorAll("a").forEach(n=>{n.contains(e.target)&&c(this,d).classList.remove("open")})})};document.addEventListener("DOMContentLoaded",async()=>{await new ke({content:document.querySelector("#main-content"),drawerButton:document.querySelector("#drawer-button"),navigationDrawer:document.querySelector("#navigation-drawer")}).renderPage();let e=null;window.addEventListener("hashchange",async()=>{var a;const n=G(),r=J[n],s=r,o=document.querySelector("#main-content");e!=null&&e.stopCamera&&e.stopCamera(),e=r,document.startViewTransition?document.startViewTransition(async()=>{var l;o.innerHTML=await s.render(),await((l=s.afterRender)==null?void 0:l.call(s))}):(o.innerHTML=await s.render(),await((a=s.afterRender)==null?void 0:a.call(s)))}),T()?(document.getElementById("login-nav").classList.add("hidden"),document.getElementById("register-nav").classList.add("hidden"),document.getElementById("logout-button").classList.remove("hidden")):(document.getElementById("login-nav").classList.remove("hidden"),document.getElementById("register-nav").classList.remove("hidden"),document.getElementById("logout-button").classList.add("hidden")),document.getElementById("logout-button").addEventListener("click",()=>{X()})});const De="MASUKKAN_VAPID_PUBLIC_KEY_DARI_API_ANDA",Te="https://story-api.dicoding.dev/v1/subscribe";async function Ae(){if("serviceWorker"in navigator&&"PushManager"in window){const e=await(await navigator.serviceWorker.ready).pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:De});await fetch(Te,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})}}Notification.requestPermission().then(t=>{t==="granted"&&Ae()});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/service-worker.js")});document.addEventListener("click",function(t){if(t.target.matches('button[aria-label="Simpan story ke offline"]')){const e={id:t.target.dataset.storyId||Date.now(),title:t.target.dataset.storyTitle||"Judul Story",body:t.target.dataset.storyBody||"Isi Story"};saveStoryToIndexedDB(e)}});window.saveStoryToIndexedDB=async function(t){await me(t),alert("Story disimpan untuk offline!")};
