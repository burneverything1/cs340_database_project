const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllRegions = `SELECT regionID, regionName FROM regions`

router.get('/', (req, res) => {
    //get all regions request
    mysql.pool.query(getAllRegions, (err, rows) => {
        if(err){
            console.log(err);
        } else {
            res.send(rows)
        }
    })
})

module.exports = router