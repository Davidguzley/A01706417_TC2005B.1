const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'cliente1',
    database: 'nerv',
    password: '',
});

module.exports = pool.promise();