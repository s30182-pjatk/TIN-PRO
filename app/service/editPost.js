const Post = require("../database/models/Post")

const editPost = async (req, res) => {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post || post.author.toString() !== req.userId) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ message: "Post updated" });
};

module.exports = editPost;