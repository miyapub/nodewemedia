'use strict';
var express = require('express');
var router = express.Router();
var contents = require('../api/v1/contents');
var content = require('../api/v1/content');
var Promise = require('bluebird');
var ObjectId = require('mongodb').ObjectId;
var CRUD = require('../libs/curd');
/* api */
router.get('/', function(req, res, next) {
    res.json({
        api: [{}, {}, {}]
    });
});

//获得全部内容

router.get('/contents', function(req, res, next) {
    CRUD.Read('contents', {}).then(function(json) {
        res.json(json);
    });
});


router.get('/contents/:page', contents.get_contents_by_page);

router.get('/content/:content_id', function(req, res, next) {
    var content_id = req.params.content_id;
    CRUD.Read('contents', {
        '_id': ObjectId(content_id)
    }).then(function(json) {
        res.json(json[0]);
    });
});

router.put('/post', function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var content_id = req.body._id;
    var setObj = {
        title: title,
        content: content
    }
    CRUD.Update('contents', {
        '_id': ObjectId(content_id)
    }, setObj).then(function(json) {
        res.json(json);
    });
});

router.delete('/content/:content_id', function(req, res, next) {
    var content_id = req.params.content_id;
    res.json({
        id: content_id
    });
});
router.get('/set/:user_id', function(req, res, next) {
    res.json();
});
router.put('/set/:user_id', function(req, res, next) {
    res.json();
});
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var userpass = req.body.userpass;
    
    CRUD.Read('users', {
        username:username
    }).then(function(json) {
        if(json[0].userpass===userpass){
            res.json({state:1});
        }else{
            res.json({state:0});
        }
    });
});
router.post('/post', function(req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var objs = [{
        title: title,
        content: content
    }]

    CRUD.Create('contents', objs).then(function(json) {
        res.json(json);
    });
});
router.post('/reg', function(req, res, next) {
    var username = req.body.username;
    var userpass = req.body.userpass;

    res.json({
        state: userpass
    });
});
router.get('/logout', function(req, res, next) {
    res.json();
});

module.exports = router;
