var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var api_v1 = require('./routes/api_v1');
var mp = require('./routes/mp');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'node',
    name: 'wemedia', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {
        maxAge: 80000
    }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libs', express.static('bower_components'));
app.use('/api/v1', api_v1);
app.use('/mp', mp);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;