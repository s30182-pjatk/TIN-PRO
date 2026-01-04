const Post = require("../database/models/Post");

const env = require("dotenv");

env.config();

const post = async (req, res) => {
    try{
        const post = await Post
            .findById(req.params.id)
            .populate(
                "author", "username"
            )
        res.render(
            "post", {post}
        )

    } catch (err){
        console.error(err);
        res.status(500).json({message: "ERROR OCCURRED"})
    }
}

module.exports = post;