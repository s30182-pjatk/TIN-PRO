const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect("/api/signup");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.id;
        next();
    } catch {
        res.clearCookie("token");
        return res.redirect("/api/");
    }
};


module.exports = authenticateUser;