var express = require('express'),
    xRequestId = require('exwml').XRequestId,
    expressWinston = require('exwml').expressWinston,
    app = express();


app.use(expressWinston());
app.use(xRequestId());

app.get('/emerg', function(req, res, next) {
    let message = 'NOT OK, NOT OK, NOT OK';
    logger.emerg(message, {
        'x-request-id': req.id
    });
    res.status(500).json({
        command: 'GET /emerg',
        response: message
    });
});

app.get('/alert', function(req, res, next) {
    let message = 'NOT OK, gonna tell the sheriff';
    logger.alert(message, {
        'x-request-id': req.id
    });
    res.status(500).json({
        command: 'GET /alert',
        response: message
    });
});

app.get('/crit', function(req, res, next) {
    let message = 'NOT OK, I\`m not able to do anything anymore';
    logger.crit(message, {
        'x-request-id': req.id
    });
    res.status(500).json({
        command: 'GET /crit',
        response: message
    });
});

app.get('/error', function(req, res, next) {
    let message = 'NOT OK';
    logger.error(message, {
        'x-request-id': req.id
    });
    res.status(500).json({
        command: 'GET /error',
        response: message
    });
});

app.get('/warning', function(req, res, next) {
    let message = 'Not 100% OK';
    logger.warning(message, {
        'x-request-id': req.id
    });
    res.status(200).json({
        command: 'GET /warning',
        response: message
    });
});

app.get('/notice', function(req, res, next) {
    let message = 'OK, but I\'m watching you';
    logger.notice(message, {
        'x-request-id': req.id
    });
    res.status(200).json({
        command: 'GET /notice',
        response: message
    });
});

app.get('/info', function(req, res) {
    let message = 'OK';
    logger.info(message, {
        'x-request-id': req.id
    });
    res.status(200).json({
        command: 'GET /info',
        response: message
    });
});

app.get('/debug', function(req, res, next) {
    let message = 'OK, because I\'m debugging everything';
    logger.debug(message, {
        'x-request-id': req.id
    });
    res.status(500).json({
        command: 'GET /debug',
        response: message
    });
});

app.listen(8080, function() {
    logger.info('Example app listening on port %s!', 8080);
});
