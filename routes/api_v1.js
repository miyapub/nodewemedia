'use strict';
var express = require('express');
var router = express.Router();
var contents = require('../api/v1/contents');
var content = require('../api/v1/content');
var Promise = require('bluebird');
var ObjectId = require('mongodb').ObjectId;
var CRUD = require('../libs/curd');
var authorize = require('../middleware/authorize_api');
/* api */
router.get('/', function (req, res, next) {
    res.json({
        api: [{}, {}, {}]
    });
});

//获得全部内容

router.get('/contents', function (req, res, next) {
    CRUD.Read('contents', {}).then(function (json) {
        res.json(json);
    });
});


router.get('/contents/:page', contents.get_contents_by_page);

router.get('/content/:content_id', function (req, res, next) {
    var content_id = req.params.content_id;
    CRUD.Read('contents', {
        '_id': ObjectId(content_id)
    }).then(function (json) {
        var content = json[0];
        var view_count = 0;
        if (content.hasOwnProperty('view_count')) {
            view_count = content.view_count + 1;
        }
        if (view_count === null) {
            view_count = 0;
        }
        //更新阅读数量
        CRUD.Update('contents', {
            '_id': ObjectId(content_id)
        }, {
            view_count: view_count
        }).then(function (json) {

        });
        //
        res.json(content);
    });
});
router.get('/select_a/:content_id', function (req, res, next) {
    var content_id = req.params.content_id;
    CRUD.Read('contents', {
        '_id': ObjectId(content_id)
    }).then(function (json) {
        var content = json[0];
        var select_a_vote_count = content.select_a_vote_count + 1;
        //更新select_a_vote_count
        CRUD.Update('contents', {
            '_id': ObjectId(content_id)
        }, {
            select_a_vote_count: select_a_vote_count
        }).then(function (json) {
            res.json(json);
        });
        //
    });
});
router.get('/select_b/:content_id', function (req, res, next) {
    var content_id = req.params.content_id;
    CRUD.Read('contents', {
        '_id': ObjectId(content_id)
    }).then(function (json) {
        var content = json[0];
        var select_b_vote_count = content.select_b_vote_count + 1;
        //更新select_a_vote_count
        CRUD.Update('contents', {
            '_id': ObjectId(content_id)
        }, {
            select_b_vote_count: select_b_vote_count
        }).then(function (json) {
            res.json(json);
        });
        //
    });
});
router.put('/post', authorize, function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var content_id = req.body._id;
    var select_a_title = req.body.select_a_title;
    var select_b_title = req.body.select_b_title;
    var setObj = {
        title: title,
        content: content,
        select_a_title: select_a_title,
        select_b_title: select_b_title
    }
    CRUD.Update('contents', {
        '_id': ObjectId(content_id)
    }, setObj).then(function (json) {
        res.json(json);
    });
});

router.delete('/content/:content_id', authorize, function (req, res, next) {
    var content_id = req.params.content_id;
    res.json({
        id: content_id
    });
});
router.get('/set/:user_id', function (req, res, next) {
    res.json();
});
router.put('/set/:user_id', function (req, res, next) {
    res.json();
});

router.post('/post', authorize, function (req, res, next) {

    var author = req.session.username;
    var title = req.body.title;
    var content = req.body.content;
    var select_a_title = req.body.select_a_title;
    var select_b_title = req.body.select_b_title;

    var objs = [{
        author: author,
        title: title,
        content: content,
        view_count: 0,
        select_a_title: select_a_title,
        select_b_title: select_b_title,
        select_a_vote_count: 0,
        select_b_vote_count: 0,
    }]

    CRUD.Create('contents', objs).then(function (json) {
        res.json(json);
    });
});
router.post('/reg', function (req, res, next) {
    var username = req.body.username;
    var userpass = req.body.userpass;

    res.json({
        state: userpass
    });
});
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.json();
});

module.exports = router;