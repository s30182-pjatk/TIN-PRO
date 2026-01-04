const Post = require("../database/models/Post");
const Subscription = require("../database/models/Subscription");
require("dotenv").config();

const homeApi = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(process.env.PAGE_LIMIT) || 5;
        const feed = req.query.feed || "all";
        const userId = req.userId;

        let filter = {};

        if (feed === "subscribed") {
            if (!userId) {
                return res.json({ posts: [], totalPages: 1 });
            }

            const subscriptions = await Subscription.find({
                subscriber: userId
            }).select("publisher");

            const publisherIds = subscriptions.map(s => s.publisher);

            if (publisherIds.length === 0) {
                filter._id = null;
            } else {
                filter.author = { $in: publisherIds };
            }
        }

        const totalPosts = await Post.countDocuments(filter);
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find(filter)
            .populate("author", "username")
            .sort({ postDate: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({ posts, currentPage: page, totalPages, feed });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ERROR OCCURRED" });
    }
};


module.exports = homeApi;
