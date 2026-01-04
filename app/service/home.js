const home = async (req, res) => {
    res.render("home", {
        feed: "all",
        currentPage: 1
    });
};

module.exports = home;
