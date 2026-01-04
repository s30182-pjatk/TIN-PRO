const Subscription = require("../database/models/Subscription");
const User = require("../database/models/User");
const Post = require("../database/models/Post");

const user = async (req, res) => {


    const userId = req.params.id;
    const viewerId = req.userId;

    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGE_LIMIT;

    const totalPages = Math.ceil(await Post.find({ author: userId }).countDocuments() / limit);

    try {

        const user = await User.findById(userId).lean();
        const posts = await Post.find({ author: userId })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ postDate: -1 })
            .lean();

        let isSubscribed = false;

        if (viewerId) {
            const sub = await Subscription.findOne({
                subscriber: viewerId,
                publisher: userId
            });
            isSubscribed = !!sub;
        }

        res.render("user", { user, posts, totalPages, currentPage: page, isSubscribed });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ERROR OCCURRED" });
    }
};

module.exports = user;
