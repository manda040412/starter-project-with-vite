// CSS imports
import '../styles/styles.css';
import { isLogin, logout } from './data/auth.api';
import { saveStory, getStories, deleteStory } from "./db.js";

import App from './pages/app';
import routes from './routes/routes.js';
import { getActiveRoute } from './routes/url-parser';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();
  
  let thisPage = null;
  
  window.addEventListener('hashchange', async () => {
    const routeName = getActiveRoute();
    const route = routes[routeName];
    const page = route;
    const appElement = document.querySelector('#main-content');
    
    if(thisPage?.stopCamera) thisPage.stopCamera();
    
    thisPage = route;
  
    if (document.startViewTransition) {
      // Use View Transition API (modern browser)
      document.startViewTransition(async () => {
        appElement.innerHTML = await page.render();
        await page.afterRender?.();
      });
    } else {
      // Fallback for older browsers
      appElement.innerHTML = await page.render();
      await page.afterRender?.();
    }
  });

  if (isLogin()) {
    document.getElementById("login-nav").classList.add('hidden');
    document.getElementById("register-nav").classList.add('hidden');
    document.getElementById("logout-button").classList.remove('hidden');
  } else {
    document.getElementById("login-nav").classList.remove('hidden');
    document.getElementById("register-nav").classList.remove('hidden');
    document.getElementById("logout-button").classList.add('hidden');
  }
  
  document.getElementById("logout-button").addEventListener("click", () => {
    logout();
  })
});

const VAPID_PUBLIC_KEY = "MASUKKAN_VAPID_PUBLIC_KEY_DARI_API_ANDA"; // Ganti dengan VAPID key dari API Dicoding
const SUBSCRIBE_ENDPOINT = "https://story-api.dicoding.dev/v1/subscribe"; // Ganti jika endpoint berbeda

async function subscribePush() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const reg = await navigator.serviceWorker.ready;
    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY
    });
    await fetch(SUBSCRIBE_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: { "Content-Type": "application/json" }
    });
  }
}

Notification.requestPermission().then(permission => {
  if (permission === "granted") subscribePush();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

// Tambahkan di komponen story
document.addEventListener('click', function (event) {
  if (event.target.matches('button[aria-label="Simpan story ke offline"]')) {
    // TODO: Ambil data story yang ingin disimpan dari DOM atau state aplikasi
    const storyData = {
      id: event.target.dataset.storyId || Date.now(),
      title: event.target.dataset.storyTitle || "Judul Story",
      body: event.target.dataset.storyBody || "Isi Story"
    };
    saveStoryToIndexedDB(storyData);
  }
});

window.saveStoryToIndexedDB = async function(story) {
  await saveStory(story);
  alert("Story disimpan untuk offline!");
};

// Misal di file render story
if (isLogin()) {
  html += `
    <button 
      aria-label="Simpan story ke offline"
      data-story-id="${story.id}"
      data-story-title="${story.title}"
      data-story-body="${story.body}">
      Simpan Offline
    </button>
  `;
}

// router.js
if (!routeFound) {
  document.getElementById("main-content").innerHTML = `
    <div class="text-center mt-5">
      <h1>404</h1>
      <p>Halaman tidak ditemukan.</p>
    </div>
  `;
}
