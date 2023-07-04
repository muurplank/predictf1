/**
 * Class that contains all of the routes for the dashboard
 * @authors
 *  - beerstj
 */
const fetch = require("node-fetch");
class DashboardRoutes {
    #app
    #errorCodes = require("../framework/utils/httpErrorCodes");
    #databaseHelper = require("../framework/utils/databaseHelper");
    #requestOptions
    #greenType;
    #avgArray

    constructor(app) {
        this.#app = app;

        this.#getTest()

    }

    async #getTest() {
        this.#app.get("/test/", async (req, res) => {

            let data = this.#databaseHelper.handleQuery({query: "SELECT * FROM test"})

            res.status(this.#errorCodes.HTTP_OK_CODE).json({data: data})
        })
    }
}

module.exports = DashboardRoutes;