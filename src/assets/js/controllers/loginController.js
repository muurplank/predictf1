/**
 * Controller class for the login-page.
 * @authors
 */

import {Controller} from "./controller.js";
import {LoginRepository} from "../repositories/loginRepository.js";
import {SessionManager} from "../framework/utils/SessionManager.js";

export class LoginController extends Controller {
    #loginView;
    #loginRepository;
    #sessionManager;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        // loads in the correct html files and creates the repository
        this.#loginView = await super.loadHtmlIntoContent("html_views/login.html")
        this.#loginRepository = new LoginRepository();
        this.#sessionManager = new SessionManager();

        this.#loginView.querySelector("#log-in-button").addEventListener("click", () => {
            this.#login()
        })
    }

    #login() {
        let username = this.#loginView.querySelector("#username");
        let password = this.#loginView.querySelector("#password")
        const errorBox = this.#loginView.querySelector("#log-in-error")

        if (password.value.length === 0 || username.value.length === 0) {
            errorBox.innerText = "Enter your username and password."
            errorBox.classList.remove("hidden")
            return
        }

        this.#loginRepository.login(username.value, password.value).then(r => {
            // user id: r.data[0].userid
            if(r.data.length === 1) {
                let userId = r.data[0].userid
                this.#sessionManager.set(userId)
            } else {
                errorBox.innerText = "Password or username incorrect"
                errorBox.classList.remove("hidden")
            }
        })
    }
}

