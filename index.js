var express = require('express'),
    config = require("./config/config"),
    app = express();

global.logger = require('./logger').getLogger(config.get('log'));

app.get('/', function(req, res) {
    res.status(200).json({
        command: 'GET /',
        response: 'OK',
        interfaces: require('child_process').execSync("ifconfig | grep inet | grep -v inet6 | awk '{gsub(/addr:/,\"\");print $2}'").toString().trim().split("\n")
    });
});

app.listen(80, function() {
    logger.info('Example app listening on port 80!');
});
