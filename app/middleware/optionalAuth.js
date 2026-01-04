const jwt = require("jsonwebtoken");


const optionalAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.userId = decoded.id;
        } catch {}
    }
    next();
};

module.exports = optionalAuth;