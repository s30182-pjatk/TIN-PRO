const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const postSchema = new Schema(
    {
        title: String,
        content: String,
        postDate: {
            type: Date,
            default: Date.now(),
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }
);
const post = mongoose.model("Post", postSchema);
module.exports = post;