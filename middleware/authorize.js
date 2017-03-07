module.exports = function (req, res, next) {
    if (!req.session.userid) {
        res.redirect('/login');
    } else {
        next();
    }
}