const env = require('dotenv');
const express = require('express');
const Connection = require("./database/db");
const app = express();
const path = require("path");
const authRoute = require("./route/route");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

env.config();

Connection();

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Parsers
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
    // Set CORS headers
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Replace with your frontend domain
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)

    // Pass to next layer of middleware
    next();
});

app.use("/api", authRoute);
app.use("/admin", require("./route/admin"));

app.listen(
    process.env.PORT, '0.0.0.0', () => {
        console.log(`Server is running on PORT ${process.env.PORT}`)
    }
);