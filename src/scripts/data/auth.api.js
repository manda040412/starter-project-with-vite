import CONFIG from "../config";

export const registerAccount = async (name, email, password) => {
    const request = new Request(`${CONFIG.BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });
    
    const response = await fetch(request);
    const body = await response.json();
    
    if(!response.ok) throw new Error(body?.message ?? "Gagal register akun");
    
    return body;
}

export const signinAccount = async (email, password) => {
    const request = new Request(`${CONFIG.BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const response = await fetch(request);
    const body = await response.json();
    
    if(!response.ok) throw new Error(body?.message ?? "Gagal masuk");
    
    localStorage.setItem("token", body?.loginResult?.token);
    localStorage.setItem("user-data", JSON.stringify(body?.loginResult));
    
    document.getElementById("login-nav").classList.add('hidden');
    document.getElementById("register-nav").classList.add('hidden');
    document.getElementById("logout-button").classList.remove('hidden');
    
    return body;
}

export const logout = () => {
    localStorage.removeItem("token");
    
    document.getElementById("login-nav").classList.remove('hidden');
    document.getElementById("register-nav").classList.remove('hidden');
    document.getElementById("logout-button").classList.add('hidden');
    window.location.hash = "/login";
}

export const isLogin = () => {
    return localStorage.getItem('token') ? true : false;
}

export const getAuthToken = () => {
    if(!isLogin()) window.location.hash = "/login";
    
    return localStorage.getItem('token') ?? null;
}