'use strict';
module.exports = function(config)
{

    var express      = require('express'),
        path         = require('path'),
        favicon      = require('serve-favicon'),
        logger       = require('morgan'),
        cookieParser = require('cookie-parser'),
        bodyParser   = require('body-parser'),
        routes       = require('./routes'),
        app          = express();
    
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use('/static', express.static(path.join(__dirname, '..', 'node_modules')));
    
    app.use('/', routes);
    
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    
    // error handlers
    
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }
    
    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
    
    var server = app.listen(config.ux.port, function () {
        var port = server.address().port;
        console.log('[ux] listener started on tcp ' + port);
    });
    
    return server;
};