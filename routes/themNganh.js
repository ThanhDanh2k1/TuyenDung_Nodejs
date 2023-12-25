const express = require('express')
const router = express.Router()
const multer = require("multer")

const Page_Nganh = require("../models/ThemNganh")

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./public/images")
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload=multer({storage:storage})

router.get('/', (req, res, next) => {
    if (req.cookies.userloginNumber == null || req.cookies.userloginNumber == "") {
        res.render("error")
    } else if (req.cookies.userloginNumber == 0) {
        res.render("themNganh/themNganh",{
            tontai:false
        })
    }
})
router.post("/signUp", upload.single("imgSrc"), (req, res, next) => {
    Page_Nganh.findOne({ nameNganh: req.body.nameNganh }, function (err, nganh) {
        if (nganh) {
            res.render("themNganh/themNganh",{
                tontai:true,
                ten:nganh.nameNganh
            })
        }
        else {
            const themNganh = new Page_Nganh(req.body)
            themNganh.save()
            res.redirect("/")
        }
    })
})

router.get('/:id/edit', (req, res, next) => {
    if (req.cookies.userloginNumber == 0) {
        Page_Nganh.findById(req.params.id)
            .then(page => res.render("themNganh/editPage", { page }))
            .catch(next)
    } else {
        res.render("error")
    }
})
router.post('/:id', (req, res, next) => {
    Page_Nganh.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect("/me"))
        .catch(next)

})

router.get('/:id/delete', (req, res, next) => {
    if (req.cookies.userloginNumber == 0) {
        Page_Nganh.deleteOne({ _id: req.params.id })
            .then(page => res.redirect("/me"))
            .catch(next)
    } else {
        res.render("error")
    }
})

module.exports = router