const express = require('express')
const router = express.Router()

const Page_TD = require("../models/TuyenDungPage")
const Page_Nganh = require("../models/ThemNganh")
const Page_TV = require("../models/TimViec")

router.get("/",(req,res) => {
    Page_Nganh.find({},(e,pageNganh) => {
        if (pageNganh) {
            res.render("pages/filterWork", {pageNganh})
        }
    })
})
router.get("/:nameNganh/detail", async(req,res) => {
    const promise1 = await Page_Nganh.findOne({nameNganh:req.params.nameNganh}).then(page1=>{
        pageNganh = page1
    })
    const promise2 = await Page_TD.find({nameNganh:req.params.nameNganh}).then(page2=>{
        pageTD = page2
    })
    const promise3 = await Page_TV.find({nameNganh:req.params.nameNganh}).then(page3=>{
        pageTV = page3
    })
    res.render("pages/detail",{pageNganh:pageNganh,pageTD:pageTD,pageTV:pageTV})
    
})



module.exports = router