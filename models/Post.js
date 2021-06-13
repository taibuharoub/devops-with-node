const mongoose = require("mongoose")
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Post must have title"]
    },
    body: {
        type: String,
        required: [true, "Post must have body"]
    },
})

module.exports = mongoose.model("Post", postSchema)