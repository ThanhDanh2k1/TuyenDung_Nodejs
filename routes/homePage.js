const express = require('express')
const router = express.Router()

const Page_TD = require("../models/TuyenDungPage")
const Page_Nganh = require("../models/ThemNganh")
const Page_TV = require("../models/TimViec")

router.get('/', (req, res, next) => {
    if (req.cookies.userloginNumber==null || req.cookies.userloginNumber=="") {
        res.redirect("/login")
    } else if (req.cookies.userloginNumber==1) {
        Page_TD.find({username:req.cookies.userlogin},(e,page) => {
            if(page) {
                res.render("pages/myHome", { page })
            }
        })
    } else if (req.cookies.userloginNumber==2) {
        Page_TV.find({username:req.cookies.userlogin},(e,page) => {
            if(page) {
                res.render("pages/myHome", { page })
            }
        })
    } else if (req.cookies.userloginNumber==0) {
        Page_Nganh.find({},(e,page) => {
            if(page) {
                res.render("pages/myHome", { page })
            }
        })
    }
})

module.exports = router