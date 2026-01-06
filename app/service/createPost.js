const Post = require("../database/models/Post");

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.userId;

        if (!title || !content) {
            return res.status(400).json({
                message: "All input is required"
            });
        }

        if (title.trim().length < 3) {
            return res.status(400).json({
                field: "title",
                message: "Title must be at least 3 characters"
            });
        }

        const titleRegex = /^[a-zA-Z0-9\s]+$/;
        if (!titleRegex.test(title)) {
            return res.status(400).json({
                field: "title",
                message: "Title cannot contain special characters"
            });
        }

        if (content.trim().length < 10) {
            return res.status(400).json({
                field: "content",
                message: "Content must be at least 10 characters"
            });
        }

        const forbiddenPattern = /<script|<\/script>|<[^>]+>/i;
        if (forbiddenPattern.test(content)) {
            return res.status(400).json({
                field: "content",
                message: "HTML or script tags are not allowed"
            });
        }

        const post = await Post.create({
            title: title.trim(),
            content: content.trim(),
            author: userId
        });

        return res.status(201).json({
            success: true,
            redirectTo: `/api/post/${post._id}`
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Failed to create post"
        });
    }
};

module.exports = createPost;
