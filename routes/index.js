var express = require('express');
var router = express.Router();
var conn = require('../libs/conn');
var config = require('../config/system');
var authorize = require('../middleware/authorize');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: config.site_name
    });
});

/* pages */

router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'login'
    });
});

router.get('/post', authorize, function (req, res, next) {
    res.render('post', {
        title: 'post'
    });
});

router.get('/reg', function (req, res, next) {
    res.render('reg', {
        title: 'reg'
    });
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});


router.get('/:content_id', function (req, res, next) {
    var content_id = req.params.content_id;
    res.render('content_id', {
        title: '正在获取中...',
        content_id: content_id
    });
});

router.get('/:user_id', function (req, res, next) {
    res.render('user_id', {
        title: 'user'
    });
});



module.exports = router;