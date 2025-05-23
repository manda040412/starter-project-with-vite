import AuthPresenter from "../../utils/presenter/auth.presenter";

export default class RegisterPage {
    async render() {
        return `
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
        `;
    }

    signUpAction(event) {
        event.preventDefault(); // prevent form from refreshing the page
        this.presenter = new AuthPresenter(this);

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        this.presenter.handleRegister({name, email, password});
    }

    async afterRender() {
        const form = document.getElementById('register-form');
        form.addEventListener('submit', this.signUpAction.bind(this));
    }

    setLoading(isLoading) {
        document.querySelector('.submit-btn').disabled = isLoading;
        
        if(isLoading) document.querySelector('.submit-btn').classList.add("disabled");
        else document.querySelector('.submit-btn').classList.remove("disabled");
    }

    showError(message) {
        document.getElementById('error-msg').innerText = message;
    }

    redirectToLoginPage() {
        window.location.hash = "/login";
    }

    clearForm() {
        document.getElementById('register-form').reset();
    }
}
