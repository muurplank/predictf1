const bodyParser = require("body-parser");

class leaguesRoutes {
    #app
    #errorCodes = require("../framework/utils/httpErrorCodes");
    #databaseHelper = require("../framework/utils/databaseHelper");

    constructor(app) {
        this.#app = app;

        this.#leaguesForUser()
    }

    #leaguesForUser() {
        this.#app.post("/leagues/getAll", bodyParser.urlencoded() , async (req, res) => {
            try {
                let data = await this.#databaseHelper.handleQuery({
                    query: "SELECT l.leagueid, l.name, (SELECT COUNT(userid) FROM leaguemembers WHERE leagueid = lm.leagueid GROUP BY leagueid) as playeramount, (SELECT COUNT(leagueid) FROM leaguemembers WHERE userid=?) as leagueamount FROM leagues l INNER JOIN leaguemembers lm ON l.leagueid = lm.leagueid WHERE userid = ? GROUP BY lm.leagueid;",
                    values: [req.body.user,req.body.user]
                })

                res.status(this.#errorCodes.HTTP_OK_CODE).json({data: data})
            } catch (e) {
                console.log(e)
            }
        })
    }
}

module.exports = leaguesRoutes