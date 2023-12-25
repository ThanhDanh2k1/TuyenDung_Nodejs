const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator")

mongoose.plugin(slug)

const AccountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("account", AccountSchema)