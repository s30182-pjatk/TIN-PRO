module.exports = (req, res, next) => {
    res.locals.user = !!req.cookies.token;
    next();
};