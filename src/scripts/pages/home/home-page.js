import { showFormattedDate } from "../../utils";
import StoryPresenter from "../../utils/presenter/story.presenter";

export default class HomePage {
  async render() {
    return `
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
    `;
  }

  async setLoading(isLoading) {
    if (!isLoading) {
      document.getElementById("loading-text").classList.add("hidden");
    } else {
      document.getElementById("loading-text").classList.remove("hidden");
    }
  }

  async loadStories(data) {
    const storyListElement = document.getElementById('story-list');
    document.getElementById("no-data-text").classList.add("hidden");

    if (data.length < 1) {
      document.getElementById("no-data-text").classList.remove("hidden");
      return;
    }

    for (let story of data) {
      storyListElement.innerHTML += `
        <div class="col-sm-6 col-md-4 col-lg-3 col-12 p-1">
          <div class="card" data-id="${story.id}">
            <div class="card-content" style="background: linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)), url(${story.photoUrl});">
              <p class="fs-5"><b>${story.name}</b></p>
              <span class="text-truncate">${story.description}</span>
              <span>${showFormattedDate(story.createdAt)}</span>
            </div>
          </div>
        </div>
      `;
    }

    // Attach click event after rendering stories
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        this.openDetailPage(id);
      });
    });
  }

  async afterRender() {
    const storyPresenter = new StoryPresenter(this);
    storyPresenter.handleFetchingStories();
  }


  openDetailPage(id) {
    window.location.hash = `/detail/${id}`
  }
}
