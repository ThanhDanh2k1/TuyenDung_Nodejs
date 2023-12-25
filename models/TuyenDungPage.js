const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")

mongoose.plugin(slug)

const PageSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nameNganh: {
        type: String,
        required: true
    },
    nameCty: {
        type: String,
        required: true
    },
    viTri: {
        type: String,
        required: true
    },
    yeuCau: {
        type: String,
        required: true
    },
    moTa: {
        type: String,
        required: true
    },
    sdt: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        slug: 'nameCty',
        unique: true
    }
})

module.exports = mongoose.model("page_TD", PageSchema)