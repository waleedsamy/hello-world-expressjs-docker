'use strict';

var winston = require('winston'),
    path = require('path'),
    fs = require('fs');

var CONSOLE_OPTIONS = {
    humanReadableUnhandledException: false,
    colorize: false,
    timestamp: true,
    json: true,
    stringify: true,
    prettyPrint: true
};

var logger;

module.exports.getLogger = function(config) {
    // singleton pattern
    if (logger) {
        return logger
    }

    // ensure log directory exists, otherwise create it
    var logPath = path.join(path.dirname(require.main.filename), config.path);
    fs.existsSync(logPath) || fs.mkdirSync(logPath);

    // prepare options
    var options = {
        transports: [],
        exceptionHandlers: [],
        rewriters: [function(level, msg, meta) {
            meta.NODE_ENV = process.env.NODE_ENV

            return meta;
        }],
    };

    // exception logging
    options.exceptionHandlers.push(new winston.transports.File({
        name: 'exception',
        filename: path.join(logPath, "exception.log"),
        humanReadableUnhandledException: true
    }));

    // error logging
    options.transports.push(new winston.transports.File({
        name: 'error',
        filename: path.join(logPath, "error.log"),
        level: 'error'
    }));

    // configured transports
    config.transports && config.transports.forEach(function(type) {
        if (type == 'DailyRotateFile') {
            options.transports.push(new winston.transports.DailyRotateFile({
                name: 'file',
                filename: path.join(logPath, "logger.log"),
                level: 'info',
                datePattern: '.yyyy-MM-ddTHH',
                maxFiles: 2400
            }));
        }
        if (type == 'Console') {
            options.transports.push(new winston.transports.Console(CONSOLE_OPTIONS));
        }
    });

    // configured exceptionHandlers
    config.exceptionHandlers && config.exceptionHandlers.forEach(function(type) {
        if (type == 'Console') {
            options.exceptionHandlers.push(new winston.transports.Console(CONSOLE_OPTIONS));
        }
    });

    logger = new winston.Logger(options);
    return logger;
};
