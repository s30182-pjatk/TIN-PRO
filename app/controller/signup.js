const User = require('../database/models/User');
const Role = require('../database/models/Role');
const { createSecretToken } = require("../tokenGeneration/generateToken");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        // 1️⃣ Presence validation
        if (!username || !email || !password) {
            return res.status(400).json({
                field: "form",
                message: "All fields are required"
            });
        }

        // 2️⃣ Normalize
        username = username.trim();
        email = email.trim().toLowerCase();
        password = password.trim();


        // 4️⃣ Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                field: "email",
                message: "Invalid email format"
            });
        }


        // 6️⃣ Duplicate user check
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).json({
                field: "email",
                message: "User already exists"
            });
        }

        // 7️⃣ Create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = await Role.findOne({ name: "user" });

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role._id
        });

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 86400000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax"
        });

        return res.status(201).json({
            success: true,
            redirectTo: "/api/login"
        });

    } catch (error) {
        console.error("Create user error:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = createUser;
