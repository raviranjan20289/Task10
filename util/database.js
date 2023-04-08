const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    database: 'connect-node',
    password: 'connectnode'
});

module.exports = pool.promise();