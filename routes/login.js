const express = require('express')
const router = express.Router()

const Account = require("../models/account")
const Page_Nganh = require("../models/ThemNganh")

router.get("/logout",(req,res)=>{
    res.cookie('userlogin',"")
    res.cookie('userloginName',"")
    res.cookie('userloginNumber',"")
    res.redirect("/")
})

router.get('/register', (req, res) => {
    res.render("account/register",{              
        message:false
    })
})
router.get('/login', (req, res, next) => {
    res.render("account/login",{
        mess:false
    })
})
router.post('/register', (req, res, next) => {
    Account.findOne({ username: req.body.username }, function (err, account) {
        if (account) {
            res.render("account/register",{ 
                message:true
            })
        } else {
            const tk = new Account(req.body)
            tk.save()
            res.clearCookie("loi");
            res.redirect("/login")
        }
    })
})

router.post('/user', (req, res, next) => {
    Account.findOne({username:req.body.username,password:req.body.password}, function(err, account) {
        if(account) {
            res.cookie('userlogin', req.body.username);
            res.cookie('userloginName', account.name);
            res.cookie('userloginNumber', account.mission);
            res.redirect("/")
        } else {
            res.render("account/login",{
                mess:true
            })
        }
    })    
})

router.get("/",(req,res) => {
    Page_Nganh.find({}, (e,pageNganh) => {
        if (pageNganh) {
            res.render("pages/home", { pageNganh })
        }
    })
})

module.exports = router