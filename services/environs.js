const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllEnvirons = `SELECT environID, environName FROM environFactors`
const insertEnvirons = `INSERT INTO environFactors
    (environName, plantEffect)
    VALUES (?, ?)`

//get all environs request
router.get('/', (req, res) => {
    mysql.pool.query(getAllEnvirons, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

//add environs request
router.post('/', (req, res) => {
    let content = req.body
    mysql.pool.query(insertEnvirons, ([content.environName, content.plantEffect]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

module.exports = router