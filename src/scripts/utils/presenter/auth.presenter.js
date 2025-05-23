import { registerAccount, signinAccount } from "../../data/auth.api";

export default class AuthPresenter {
    constructor(view) {
        this.view = view;
    }

    async handleRegister({ name, email, password }) {
        try {
            this.view.setLoading(true);
            const data = await registerAccount(name, email, password);

            this.view.redirectToLoginPage();
        } catch (err) {
            this.view.showError(err.message);
        } finally {
            this.view.setLoading(false);
        }
    }

    async handleLogin({ email, password }) {
        try {
            this.view.setLoading(true);
            const data = await signinAccount(email, password);
            
            this.view.redirectToHomePage();
        } catch (err) {
            this.view.showError(err.message);
        } finally {
            this.view.setLoading(false);
        }
    }
}