const User = require('../database/models/User');

const { createSecretToken } = require("../tokenGeneration/generateToken");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try{
        if (
            !(
                req.body.email &&
                req.body.password &&
                req.body.username
            )
        ){
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({email: req.body.email});

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            path: "/",
            expires: new Date(Date.now() + 86400000),
            secure: false,
            httpOnly: true,
            sameSite: "Lax",
        })

        console.log("cookie set successfully");

        // res.json(user);
        res.render("login")
    }catch (error){
        console.log("Got an error", error);
    }
};

module.exports = createUser;