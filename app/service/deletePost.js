const Post = require("../database/models/Post");

const env = require("dotenv");

env.config();

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting post" });
    }
}

module.exports = deletePost;