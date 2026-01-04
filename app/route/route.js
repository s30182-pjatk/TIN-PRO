const express = require("express");
const router = express.Router();

const home = require("../service/home");
const homeApi = require("../service/homeApi");

const login = require("../controller/login");
const createUser = require("../controller/signup");
const createPost = require("../service/createPost");
const profile = require("../service/profile");
const deletePost = require("../service/deletePost");
const post = require("../service/post");
const user = require("../service/user");
const toggleSubscription = require("../service/toggleSubscription");
const editPost = require("../service/editPost");
const getPostsUser = require("../service/getPostsUser");

const isAuth = require("../middleware/isAuth");
const authenticateUser = require("../middleware/authenticateuser");
const optionalAuth = require("../middleware/optionalAuth")


router.get("/", isAuth,optionalAuth, home);


router.get("/home", optionalAuth, homeApi);


router.get("/login", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));
router.get("/profile", isAuth, authenticateUser, profile);
router.get("/post", isAuth, authenticateUser, (req, res) => res.render("createPost"));
router.get("/post/:id", isAuth, post);
router.get("/user/:id", authenticateUser, user);
router.get("/profile-posts/:id", isAuth, getPostsUser);

router.post("/signup", createUser);
router.post("/login", login);
router.post("/post", authenticateUser, createPost);
router.post("/subscribe/:id", authenticateUser, toggleSubscription);

router.delete("/post/delete/:id", deletePost);
router.put("/post/:id", authenticateUser, editPost);

router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/api/");
});

module.exports = router;
