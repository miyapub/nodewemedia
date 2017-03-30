var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('mp', {
        title: 'mp'
    });
});

router.get('/list', function(req, res, next) {
    res.render('mp_list', {
        title: 'list'
    });
});

router.get('/post', function(req, res, next) {
    res.render('mp_post', {
        title: 'post'
    });
});

router.get('/edit/:content_id', function(req, res, next) {
    var content_id = req.params.content_id;
    res.render('mp_edit', {
        title: '正在获取中...',
        content_id: content_id
    });
});

router.get('/set', function(req, res, next) {
    res.render('mp_set', {
        title: 'set'
    });
});


module.exports = router;
