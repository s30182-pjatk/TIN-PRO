const Post = require("../database/models/Post");
const Subscription = require("../database/models/Subscription");

const getPostsData = async ({ page, limit, feed, userId }) => {
    let filter = {};

    if (feed === "subscribed") {
        if (!userId) {
            filter._id = null;
        } else {
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
    }

    const totalPosts = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / limit);

    const posts = await Post.find(filter)
        .populate("author", "username")
        .sort({ postDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    return { posts, totalPages };
};

module.exports = getPostsData;
