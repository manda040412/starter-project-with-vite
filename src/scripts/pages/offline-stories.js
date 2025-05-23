import { getStories, deleteStory } from "../db.js";

const OfflineStoriesPage = {
  async render() {
    return `
      <section class="container">
        <h1>Story Offline</h1>
        <div id="offline-stories-list"></div>
      </section>
    `;
  },

  async afterRender() {
    await renderOfflineStories();
  }
};

export default OfflineStoriesPage;

export async function renderOfflineStories() {
  const stories = await getStories();
  const container = document.getElementById("offline-stories-list");
  if (!stories.length) {
    container.innerHTML = "<p>Tidak ada story offline.</p>";
    return;
  }
  container.innerHTML = stories.map(story => `
    <div class="card my-2 p-2">
      <h3>${story.title}</h3>
      <p>${story.body}</p>
      <button class="btn btn-danger" onclick="deleteOfflineStory('${story.id}')">Hapus</button>
    </div>
  `).join("");
}

window.deleteOfflineStory = async function(id) {
  await deleteStory(id);
  alert("Story offline dihapus!");
  renderOfflineStories();
};