const Post = require("../database/models/Post");

const env = require("dotenv");

env.config();

const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGE_LIMIT;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
        .populate("author", "username")
        .sort({ postDate: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

    res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit)
    })};

module.exports = getPosts;