const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_leeyeh',
    password        : '3028',
    database        : 'cs340_leeyeh'
});
module.exports.pool = pool;