/**
 * Controller class for the dashboard.
 * gets the data through the repository and api's and displays them on de dashboard page.
 * @authors
 */

import {Controller} from "./controller.js";
import {DashboardRepository} from "../repositories/dashboardRepository.js";

export class DashboardController extends Controller {
    #dashboardView;
    #dashboardRepository;

    constructor() {
        super();
        this.#setupView();
    }

    async #setupView() {
        // loads in the correct html files and creates the repository
        this.#dashboardView = await super.loadHtmlIntoContent("html_views/dashboard.html")
        this.#dashboardRepository = new DashboardRepository();

        this.logTest()
    }

    async logTest() {
        console.log(await this.#dashboardRepository.loadTestData())
    }
}

