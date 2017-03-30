var express = require('express');
var router = express.Router();
var config = require('../config/system');
var ObjectId = require('mongodb').ObjectId;
var CRUD = require('../libs/curd');
var authorize = require('../middleware/authorize_api');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: config.site_name
    });
});

/* api */
//注册
router.post('/api/reg/username_can_use', function (req, res, next) {
    var username = req.body.username;
    CRUD.Read('users', {
        username: username
    }).then(function (json) {
        if (json.length > 0) {
            //已经被占用
            res.json({
                status: 0,
                msg: "用户名已被占用"
            });
        } else {
            //可以注册
            res.json({
                status: 1,
                msg: "用户名可以注册"
            });
        }
    });
});
router.post('/api/reg', function (req, res, next) {
    var username = req.body.username;
    var userpass = req.body.userpass;
    CRUD.Read('users', {
        username: username
    }).then(function (json) {
        if (json.length > 0) {
            //已经被占用
            res.json({
                status: 0,
                msg: "用户名已经被占用"
            });
        } else {
            //可以注册
            var objs = [{
                username: username,
                userpass: userpass
            }];
            CRUD.Create('users', objs).then(function (json) {
                //注册成功后，给一个默认的列表
                var
                    default_project = [{
                            title: "Personal",
                            username: username,
                            tasks: [{
                                    title: "task 1"
                                },
                                {
                                    title: "task 2"
                                }
                            ]
                        },
                        {
                            title: "Shoping",
                            username: username,
                            tasks: [{
                                    title: "buy 1"
                                },
                                {
                                    title: "buy 2"
                                }
                            ]
                        },
                        {
                            title: "Work",
                            username: username,
                            tasks: [{
                                    title: "todo 1"
                                },
                                {
                                    title: "todo 2"
                                }
                            ]
                        }
                    ];
                CRUD.Create('projects', default_project).then(function (json) {
                    res.json({
                        status: 1,
                        msg: "注册成功，请登录！"
                    });
                });

            });
        }
    });
});

//登录
router.post('/api/login', function (req, res, next) {
    var username = req.body.username;
    var userpass = req.body.userpass;
    CRUD.Read('users', {
        username: username
    }).then(function (json) {
        if (json.length > 0) {
            var user = json[0];
            if (user.userpass === userpass) {
                req.session.userid = user._id;
                req.session.username = user.username;
                res.json({
                    status: 1
                });
            } else {
                res.json({
                    status: 0
                });
            }
        } else {
            res.json({
                status: 0
            });
        }
    });
});
//获取登录状态
router.get('/api/login_status', function (req, res, next) {
    if (req.session.hasOwnProperty('userid')) {
        res.json({
            status: 1,
            userid: req.session.userid,
            username: req.session.username
        });
    } else {
        res.json({
            status: 0
        });
    }
});
//获取 projects
router.get('/api/user/projects', function (req, res, next) {
    if (req.session.hasOwnProperty('userid')) {
        CRUD.Read("projects", {
            username: req.session.username
        }).then(function (json) {
            res.json({
                status: 1,
                projects:json
            });
        });

    } else {
        res.json({
            status: 0
        });
    }
});

//退出
router.get('/api/logout', function (req, res, next) {
    req.session.destroy();
    res.json({
        status: 1
    });
});
//获得用户 清单 列表
router.get('/api/user/get_list', function (req, res, next) {

});
//获得用户 清单 具体 
router.get('/api/user/get_list/:list_id', function (req, res, next) {

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