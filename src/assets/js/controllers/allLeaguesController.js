import {Controller} from "./controller.js";
import {SessionManager} from "../framework/utils/sessionManager.js";
import {leaguesRepository} from "../repositories/leaguesRepository.js";

export class AllLeaguesController extends Controller {
    #allLeaguesView;
    #allLeaguesRepository
    #sessionManager
    #userID

    constructor() {
        super();

        this.#sessionManager = new SessionManager()
        this.#allLeaguesRepository = new leaguesRepository()
        this.#userID = this.#sessionManager.get("userid")

        this.#setupView()
    }

    async #setupView() {
        this.#allLeaguesView = await super.loadHtmlIntoContent("html_views/allLeagues.html")

        this.#createLeagueCards();
    }

    #createLeagueCards() {
        const cardContainer = this.#allLeaguesView.querySelector("#league-cards-container")
        const leagueAmountContainer = this.#allLeaguesView.querySelector("#league-amount")


        this.#allLeaguesRepository.getLeagues(this.#userID).then(r => {
            leagueAmountContainer.innerText = r.data[0].leagueamount;

            for (let i = 0; i < r.data.length; i++) {
                console.log("League: " + r.data[i].leagueid)

                cardContainer.innerHTML +=
                    `<div class="league-card">
                          <div class="league-card-image-container">
                            <img src="../assets/pictures/drivers/`+ (i+1) +`.png" width="250" height="175" alt="driver picture">
                          </div>
    
                          <div class="league-card-text-container">
                            <p class="league-card-title">` + r.data[i].name + `</p>
                            <p class="league-card-player-amount"> `+ (r.data[i].playeramount -1) + ` Other player(s) </p>
                          </div>
                    </div>`
            }
        })

    }
}