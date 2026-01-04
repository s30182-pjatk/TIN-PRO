const User = require("../database/models/User");
const bcrypt = require("bcrypt");

const env = require("dotenv");
const { createSecretToken } = require("../tokenGeneration/generateToken");

env.config();

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!(email && password)) {
        return res.status(400).json({ message: "All input is required"});
    }

    const user = await User.findOne({ email: email });
    if (!(user && (await bcrypt.compare(password, user.password)))){
        return res.status(404).json({ message: "Invalid credentials"});
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true,
        sameSite: "Lax",
    });

    // res.json({ token });
    // res.render("loginsuccess")
    // res.redirect("/api/")

    res.status(200).json({
        success: true,
        redirectTo: "/api/"
    });
};

module.exports = login;