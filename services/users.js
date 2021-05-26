const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllUsers = `SELECT userID, username FROM users`
const insertUser = `INSERT INTO users
    (username, favoritePlants)
    VALUES (?, ?)`

//get all users request
router.get('/', (req, res) => {
    mysql.pool.query(getAllUsers, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

//add user request
router.post('/', (req, res) => {
    let content = req.body
    mysql.pool.query(insertUser, ([content.username, content.favoritePlants]), (err, result) => {
        if(err){
            console.log(err);
            //Send sql error to client for debugging
            res.status(500).send(err.sqlMessage);
        } else {
            //If it was successfull, all the client needs to know is that it worked
            res.send(true)
        }
    })
})

module.exports = router