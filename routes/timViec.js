const express = require('express')
const router = express.Router()

const Page_Nganh = require("../models/ThemNganh")
const Page_TV = require("../models/TimViec")

router.get("/", (req,res,next) => {
    if (req.cookies.userloginNumber==2) {
        Page_Nganh.find({}, (e,pageNganh) => {
            if (pageNganh) {
                res.render("timViec/timViec", { pageNganh })
            }
        })
    } else {
        res.render("error")
    }
})

router.post("/signUp",(req,res) => {
    const TimViec = new Page_TV({
        username:req.cookies.userlogin,
        nameNganh:req.body.nameNganh,
        myName:req.body.myName,
        viTri:req.body.viTri,
        gioiThieu:req.body.gioiThieu,
        luong:req.body.luong,
        sdt:req.body.sdt,
        time:req.body.time
    })
    TimViec.save()
    res.redirect("/")
})

router.get('/:id/edit', (req, res,next) => {
    if (req.cookies.userloginNumber==2) {
        Page_TV.findById(req.params.id)
        .then(page => res.render("timViec/editPage", {page}))
        .catch(next)
    } else {
        res.render("error")
    }
})
router.post('/:id', (req, res, next) => {
    Page_TV.updateOne({ _id: req.params.id }, req.body)
        .then(()=>res.redirect("/me"))
        .catch(next)
    
})

router.get('/:id/delete', (req, res,next) => {
    if (req.cookies.userloginNumber==2) {
        Page_TV.deleteOne({ _id: req.params.id })
        .then(page => res.redirect("/me"))
        .catch(next)
    } else {
        res.render("error")
    }
})


module.exports = router