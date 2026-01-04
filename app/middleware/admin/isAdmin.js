const User = require("../../database/models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAdmin = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.redirect("/api/login");
    }

    try {
        const decodedId = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        ).id;

        const user = await User
            .findById(decodedId)
            .populate("role", "name");

        if (!user || user.role.name !== "admin") {
            return res.redirect("/api/login");
        }

        req.user = user;
        next();

    } catch (err) {
        return res.redirect("/api/login");
    }
};

module.exports = isAdmin;
