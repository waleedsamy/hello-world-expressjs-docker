var nconf = require('nconf'),
    path = require('path');

nconf.env()
    .argv()
    .file('node_env', {
        file: process.env.NODE_ENV + '.json',
        dir: __dirname,
        search: true
    })
    .file('default', {
        file: 'default.json',
        dir: __dirname,
        search: true
    })
    .required([
        'NODE_ENV',
        'log'
    ]);

module.exports = nconf;
