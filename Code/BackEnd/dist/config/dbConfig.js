'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('mysql2');

var db = (0, _mysql.createConnection)({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'snackability_2'
});

exports.default = db;
//# sourceMappingURL=dbConfig.js.map