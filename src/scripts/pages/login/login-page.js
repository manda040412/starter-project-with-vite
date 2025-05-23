import AuthPresenter from "../../utils/presenter/auth.presenter";

export default class LoginPage {
    async render() {
        return `
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
        `;
    }

    signUpAction(event) {
        event.preventDefault(); // prevent form from refreshing the page
        this.presenter = new AuthPresenter(this);

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        this.presenter.handleLogin({ email, password });
    }

    async afterRender() {
        const form = document.getElementById('login-form');
        form.addEventListener('submit', this.signUpAction.bind(this));
    }

    setLoading(isLoading) {
        document.querySelector('.submit-btn').disabled = isLoading;

        if (isLoading) document.querySelector('.submit-btn').classList.add("disabled");
        else document.querySelector('.submit-btn').classList.remove("disabled");
    }

    showError(message) {
        document.getElementById('error-msg').innerText = message;
    }

    redirectToHomePage() {
        window.location.hash = "/";
    }

    clearForm() {
        document.getElementById('login-form').reset();
    }
}