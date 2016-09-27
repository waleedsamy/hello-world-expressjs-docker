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

app.listen(config.get('port'), function() {

    logger.info('Example app listening on port %s!', config.get('port'), {
        meta0: {
            ww1: "ww1",
            meta1: {
                ww2: "ww2",
                meta2: {
                    ww3: "ww3",
                    meta3: "yes"
                }
            }
        }
    });
});
