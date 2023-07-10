import {NetworkManager} from "../framework/utils/networkManager.js";

export class LoginRepository {
    #networkManager;

    #login

    constructor() {
        this.#networkManager = new NetworkManager();

        this.#login = "/users/login"
    }

    async login(username, password) {
        return await this.#networkManager.doRequest(this.#login, "POST", {
            "username": username,
            "password": password
        })
    }
}