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
    myName: {
        type: String,
        required: true
    },
    viTri: {
        type: String,
        required: true
    },
    gioiThieu: {
        type: String,
        required: true
    },
    luong: {
        type: Number,
        required: true
    },
    sdt: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'myName',
        unique: true
    }
})

module.exports = mongoose.model("page_TV", PageSchema)