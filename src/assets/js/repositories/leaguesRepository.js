import {NetworkManager} from "../framework/utils/networkManager.js";

export class leaguesRepository {
    #networkManager;

    #allLeagues

    constructor() {
        this.#networkManager = new NetworkManager();

        this.#allLeagues = "/leagues/getAll"
    }

    async getLeagues(user) {
        return await this.#networkManager.doRequest(this.#allLeagues, "POST", {
            user: user
        })
    }
}