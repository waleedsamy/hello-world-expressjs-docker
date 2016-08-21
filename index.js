var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.status(200).json({
    command: 'GET /',
    response: 'OK',
    interfaces: require('child_process').execSync("ifconfig | grep inet | grep -v inet6 | awk '{gsub(/addr:/,\"\");print $2}'").toString().trim().split("\n")
  });
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
