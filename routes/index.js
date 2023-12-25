const loginRoute = require("./login")
const TimViecPage = require("./timViec")
const TuyenDungPage = require("./tuyenDung")
const ThemNganhPage = require("./themNganh")
const HomePage = require("./homePage")
const filterPage = require("./filterPage")

function route(app) {
    app.use("/filter",filterPage)
    app.use("/me",HomePage)
    app.use("/themNganh",ThemNganhPage)
    app.use("/tuyenDung",TuyenDungPage)
    app.use("/timViec",TimViecPage)
    app.use("/",loginRoute)
}

module.exports=route