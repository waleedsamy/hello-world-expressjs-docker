var express = require('express'),
    xRequestId  = require('exwml').XRequestId,
    expressWinston = require('exwml').expressWinston,
    app = express();


app.use(expressWinston());
app.use(xRequestId());

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

app.listen(8080, function() {
    logger.info('Example app listening on port %s!', 8080);
});
