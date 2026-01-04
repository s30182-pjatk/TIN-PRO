const Post = require("../database/models/Post");

const env = require("dotenv");

env.config();

const createPost = async (req, res) => {
    const {title, content} = req.body;
    const userId = req.userId;

    if (!(
        title && content
    )){
        return res.status(400).json({ message: "All input is required"});
    }

    const newPost = new Post(
        {
            title: title,
            content: content,
            author: userId
        }
    );

    const post = await newPost.save();
    res.redirect(`/api/post/${post._id}`)
};
module.exports = createPost;

