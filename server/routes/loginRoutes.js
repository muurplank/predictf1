/**
 * Class that contains all of the routes for the dashboard
 * @authors
 *  - beerstj
 */

class LoginRoutes {
    #app
    #errorCodes = require("../framework/utils/httpErrorCodes");
    #databaseHelper = require("../framework/utils/databaseHelper");

    constructor(app) {
        this.#app = app;

        this.#login()
    }

    #login() {
        this.#app.post("/users/login", async (req, res) => {
            try {
                let data = await this.#databaseHelper.handleQuery({
                    query: "SELECT userid FROM users WHERE username = ? AND password = ?",
                    values: [req.body.username,req.body.password]
                })

                res.status(this.#errorCodes.HTTP_OK_CODE).json({data: data})
            } catch (e) {
                console.log(e)
            }
        })
    }
}

module.exports = LoginRoutes;