const path = require("path")
const express = require('express')
const morgan = require("morgan")
const route = require("./routes/index")
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use((req,res,next)=> {
    res.locals.userlogin=req.cookies.userlogin
    res.locals.userloginName=req.cookies.userloginName
    res.locals.userloginNumber=req.cookies.userloginNumber
    next()
})

// session
var session = require('express-session');
// Express-session
app.set("trust proxy", 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

const { body, validationResult, cookie } = require('express-validator');

body('username').isEmail(),
body('password').isLength({ min: 5 }),

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// http logger
app.use(morgan("combined"))

// template engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

route(app)

const config = require("./config/database")

// ket noi den database
const mongoose = require("mongoose")
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error!!!"))
db.once("open", () => {
    console.log("connect thanh cong!!!")
})


app.listen(process.env.PORT, () => function(){

})