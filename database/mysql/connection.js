/**
 * @author A.Sivatharan
 * created on 14.12.2020
 */
var mysql  = require('mysql');
const db_config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'servo'
}

const pool  = mysql.createPool(db_config);

module.exports = pool;