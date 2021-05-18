const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllEnvirons = `SELECT environID, environName FROM environFactors`

router.get('/', (req, res) => {
    //get all environs request
    mysql.pool.query(getAllEnvirons, (err, rows) => {
        if(err){
            console.log(err);
        } else {
            res.send(rows)
        }
    })
})

module.exports = router