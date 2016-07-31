var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.status(200).json({
    command: 'GET /',
    response: 'OK'
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
