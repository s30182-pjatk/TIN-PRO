const Post = require("../database/models/Post");
const User = require("../database/models/User");
const Subscription = require("../database/models/Subscription");

const profile = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).lean();

        const posts = await Post.find({ author: userId })
            .sort({ postDate: -1 })
            .lean();

        const subscribers = await Subscription.find({ publisher: userId })
            .populate("subscriber", "username email")
            .lean();

        const subscriptions = await Subscription.find({ subscriber: userId })
            .populate("publisher", "username email")
            .lean();

        res.render("profile", {
            user,
            posts,
            subscribers,
            subscriptions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ERROR OCCURRED" });
    }
};

module.exports = profile;