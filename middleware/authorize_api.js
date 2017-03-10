module.exports = function (req, res, next) {
    if (!req.session.userid) {
        res.json({
            error: 403
        });
    } else {
        next();
    }
}