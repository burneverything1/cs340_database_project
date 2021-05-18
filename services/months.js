const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllMonths = `SELECT monthID, monthName FROM months`

router.get('/', (req, res) => {
    //get all months request
    mysql.pool.query(getAllMonths, (err, rows) => {
        if(err){
            console.log(err);
        } else {
            res.send(rows)
        }
    })
})

module.exports = router