const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../database/models/User");
const Post = require("../database/models/Post");
const Subscription = require("../database/models/Subscription");
const Role = require("../database/models/Role");

require("dotenv").config();

const MONGO_URI = process.env.MONGODB_URL;

const USERS_COUNT = 5;
const POSTS_PER_USER = 12;

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");

        // ❗ Reset DB (DEV ONLY)
        await Subscription.deleteMany({});
        await Post.deleteMany({});
        await User.deleteMany({});
        await Role.deleteMany({});

        const saltRounds = 10;

        console.log("Creating roles...");

        const userRole = await Role.create({
            name: "user",
            description: "Regular user",
        });

        const adminRole = await Role.create({
            name: "admin",
            description: "Administrator",
        });

        console.log("Roles created");

        console.log("Creating admin...");

        const adminPassword = await bcrypt.hash("111111", saltRounds);

        const admin = await User.create({
            username: "admin",
            email: "admin@gmail.com",
            password: adminPassword,
            role: adminRole._id,
        });

        console.log("Admin created");

        console.log("Creating users...");

        const users = [];

        for (let i = 1; i <= USERS_COUNT; i++) {
            const hashedPassword = await bcrypt.hash(
                `password${i}`,
                saltRounds
            );

            const user = await User.create({
                username: `user${i}`,
                email: `user${i}@example.com`,
                password: hashedPassword,
                role: userRole._id,
            });

            users.push(user);
        }

        console.log(`${users.length} users created`);

        console.log("Creating posts...");

        const posts = [];

        for (const user of users) {
            for (let i = 1; i <= POSTS_PER_USER; i++) {
                posts.push({
                    title: `Post ${i} by ${user.username}`,
                    content: `This is post ${i} written by ${user.username}. Lorem ipsum dolor sit amet.`,
                    author: user._id,
                    postDate: new Date(
                        Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
                    ),
                });
            }
        }

        await Post.insertMany(posts);

        console.log(`${posts.length} posts created`);

        console.log("Creating subscriptions...");

        const subscriptions = [];

        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (i !== j && Math.random() > 0.5) {
                    subscriptions.push({
                        subscriber: users[i]._id,
                        publisher: users[j]._id,
                    });
                }
            }
        }

        if (subscriptions.length > 0) {
            await Subscription.insertMany(subscriptions, { ordered: false })
                .catch(() => {});
        }

        console.log(`${subscriptions.length} subscriptions created`);

        console.log("✅ Seeding complete");
        process.exit(0);

    } catch (err) {
        console.error("❌ Seeding error:", err);
        process.exit(1);
    }
}

seed();
