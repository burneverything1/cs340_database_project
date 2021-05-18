const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllPlants = `SELECT plantID, plantName FROM plants`

router.get('/', (req, res) => {
    //get all plants request
    mysql.pool.query(getAllPlants, (err, rows) => {
        if(err){
            console.log(err);
        } else {
            res.send(rows)
        }
    })
})

module.exports = router