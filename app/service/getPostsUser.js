const Post = require("../database/models/Post");

const user = async (req, res) => {


    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGE_LIMIT;
    const skip = (page - 1) * limit;


    const userId = req.params.id;

    const totalPosts = await Post.countDocuments({ author: userId });
    const totalPages = Math.ceil(totalPosts / limit);

    try {
        const posts = await Post.find({ author: userId })
            .skip(skip)
            .limit(limit)
            .sort({ postDate: -1 })
            .lean();

        res.json({
            posts,
            currentPage: page,
            totalPages
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "ERROR OCCURRED" });
    }
};

module.exports = user;
