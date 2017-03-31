module.exports = function (req, res, next) {
    if (!req.session.userid) {
        res.json({
            status: 0,
            msg: 403
        });
    } else {
        next();
    }
}