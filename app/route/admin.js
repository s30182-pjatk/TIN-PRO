const router = require("express").Router();

const Post = require("../database/models/Post");
const Role = require("../database/models/Role");
const User = require("../database/models/User");
const Subscription = require("../database/models/Subscription");

const isAdmin = require("../middleware/admin/isAdmin");

router.use(isAdmin);

router.get("/", (req, res) => {
    res.render("admin/index");
});

router.get("/posts", async (req, res) => {
    const posts = await Post.find().populate("author");
    res.render("admin/posts", { posts });
});

router.get("/roles", async (req, res) => {
    res.render("admin/roles", { roles: await Role.find() });
});

router.get("/users", async (req, res) => {
    const users = await User.find().populate("role");
    res.render("admin/users", { users, roles: await Role.find() });
});

router.get("/subscriptions", async (req, res) => {
    const subs = await Subscription.find()
        .populate("subscriber")
        .populate("publisher");
    res.render("admin/subscriptions", { subs });
});

router.post("/posts", async (req, res) => {
    res.json(await Post.create(req.body));
});

router.put("/posts/:id", async (req, res) => {
    res.json(await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete("/posts/:id", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

router.post("/roles", async (req, res) => {
    res.json(await Role.create(req.body));
});

router.delete("/roles/:id", async (req, res) => {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

router.post("/users", async (req, res) => {
    res.json(await User.create(req.body));
});

router.delete("/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

router.post("/subscriptions", async (req, res) => {
    res.json(await Subscription.create(req.body));
});

router.delete("/subscriptions/:id", async (req, res) => {
    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;
