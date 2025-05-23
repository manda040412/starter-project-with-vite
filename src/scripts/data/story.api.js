import CONFIG from "../config";
import { getAuthToken } from "./auth.api"

var token = getAuthToken();

export const getStories = async () => {
    const authToken = getAuthToken();
    
    const response = await fetch(`${CONFIG.BASE_URL}/stories?page=1&size=16&location=1`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${authToken}`
        }
    });
    
    if(!response.ok) throw new Error("Gagal mendapatkan data story");
    
    return response.json();
}

export const getStoryById = async (id) => {
    const response = await fetch(`${CONFIG.BASE_URL}/stories/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });
    
    if(!response.ok) throw new Error("Gagal mendapatkan data story");
    
    return response.json();
}

export const postStory = async (formData) => {
    const request = new Request(`${CONFIG.BASE_URL}/stories`, {
        method: 'POST',
        headers: {
            "Authorization" : `Bearer ${token}`
        },
        body: formData
    });
    
    const response = await fetch(request);
    
    if(!response.ok) throw new Error("Gagal mendapatkan data story");
    
    return response.json();
}