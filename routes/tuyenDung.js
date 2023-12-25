const express = require('express')
const router = express.Router()

const Page_TD = require("../models/TuyenDungPage")
const Page_Nganh = require("../models/ThemNganh")

router.get("/", (req,res,next) => {
    if (req.cookies.userloginNumber==1) {
        Page_Nganh.find({}, (e,pageNganh) => {
            if (pageNganh) {
                res.render("tuyenDung/tuyenDung", { pageNganh })
            }
        })
    } else {
        res.render("error")
    }
})

router.post('/signUp', (req, res, next) => {
    const tuyenDung = new Page_TD(
        {
        username:req.cookies.userlogin,
        nameNganh:req.body.nameNganh,
        nameCty:req.body.nameCty,
        viTri:req.body.viTri,
        yeuCau:req.body.yeuCau,
        moTa:req.body.moTa,
        sdt:req.body.sdt
        }
    )
    tuyenDung.save()
    res.redirect("/")
})

router.get('/:id/edit', (req, res,next) => {
    if (req.cookies.userloginNumber==1) {
        Page_TD.findById(req.params.id)
        .then(page => res.render("tuyenDung/editPage", {page}))
        .catch(next)
    } else {
        res.render("error")
    }
})
router.post('/:id', (req, res, next) => {
    Page_TD.updateOne({ _id: req.params.id }, req.body)
        .then(()=>res.redirect("/me"))
        .catch(next)
    
})

router.get('/:id/delete', (req, res,next) => {
    if (req.cookies.userloginNumber==1) {
        Page_TD.deleteOne({ _id: req.params.id })
        .then(page => res.redirect("/me"))
        .catch(next)
    } else {
        res.render("error")
    }
})


module.exports = router