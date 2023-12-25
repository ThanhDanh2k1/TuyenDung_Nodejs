const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")

mongoose.plugin(slug)

const PageNganhSchema = mongoose.Schema({
    nameNganh: {
        type: String,
        required: true
    },
    mucDo: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    },
    luongThap: {
        type: Number,
        required: true
    },
    luongCao: {
        type: Number,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'nameNganh',
        unique: true
    }
})

module.exports = mongoose.model("page_nganh", PageNganhSchema)