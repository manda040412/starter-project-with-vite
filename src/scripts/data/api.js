import CONFIG from '../config';

const ENDPOINTS = {
  ENDPOINT: `${CONFIG.BASE_URL}/your/endpoint/here`,
};

export async function getData() {
  const fetchResponse = await fetch(`${CONFIG.BASE_URL}/stories`, {
      headers: {
        "Content-Type" : 'Application/json',
        "Authorization" : `Bearer`
      }  
    });
  return await fetchResponse.json();
}