const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllUsers = `SELECT userID, username FROM users`

router.get('/', (req, res) => {
    //get all users request
    mysql.pool.query(getAllUsers, (err, rows) => {
        if(err){
            console.log(err);
        } else {
            res.send(rows)
        }
    })
})

module.exports = router