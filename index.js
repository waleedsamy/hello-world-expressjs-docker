var express = require('express'),
    expressWinston = require('express-winston'),
    config = require("./config/config"),
    app = express();

global.logger = require('./logger').getLogger(config.get('log'));


app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.baseUrl}}{{req.path}} {{res.statusCode}} {{res.responseTime}}ms",
    statusLevels: true
}));

app.get('/200', function(req, res) {
    res.status(200).json({
        command: 'GET /',
        response: 'OK'
    });
});

app.get('/500', function(req, res, next) {
    res.status(500).json({
        command: 'GET /500',
        response: 'NOT OK'
    });
});

app.listen(config.get('port'), function() {
    logger.info('Example app listening on port %s!', config.get('port'));
});
