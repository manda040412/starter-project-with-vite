import { getStories, getStoryById, postStory } from "../../data/story.api";

export default class StoryPresenter {
    constructor(view) {
        this.view = view;
    }

    async handleFetchingStories() {
        try {
            this.view.setLoading(true);
            const data = await getStories();
            
            this.view.loadStories(data.listStory)
        } catch (error) {
            console.error(error);
        } finally {
            this.view.setLoading(false);
        }
    }
    
    async handleFetchStoryById(id) {
        try {
            this.view.setLoading(true);
            const data = await getStoryById(id);
            
            this.view.loadStory(data.story)
        } catch (error) {
            console.error(error);
        } finally {
            this.view.setLoading(false);
        }
    }
    
    async handlePostStory(formData){
        try {
            this.view.setLoading(true);
            const data = await postStory(formData);
            this.view.redirectToHomePage();
        } catch (err) {
            console.error(err.message)
        } finally {
            this.view.setLoading(false);
        }
    }
}