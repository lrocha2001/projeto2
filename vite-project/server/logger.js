const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: "logs/app.log",
            level: "error"
        }),
        new winston.transports.File({
            filename: "logs/app.log",
            level: "info"
        }),
        new winston.transports.MongoDB({
            db: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xfqdxjl.mongodb.net/?retryWrites=true&w=majority`,
            collection: 'logs',
            level: 'info'
        })
    ]
});

module.exports = logger;
