import {NetworkManager} from "../framework/utils/networkManager.js";

export class DashboardRepository {
    #networkManager;

    #test

    constructor() {
        this.#networkManager = new NetworkManager();

        this.#test = "/test/"
    }

    async loadTestData() {
        await this.#networkManager.doRequest(this.#test, "GET")
    }

}