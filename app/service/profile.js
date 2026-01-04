const Post = require("../database/models/Post");
const User = require("../database/models/User");


const env = require("dotenv");

env.config();

const profile = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).lean();
        const posts = await Post.find({ author: userId })
            .sort({ postDate: -1 })
            .lean();

        res.render("profile", { user, posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ERROR OCCURRED" });
    }
};

module.exports = profile;