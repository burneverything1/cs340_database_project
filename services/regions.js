const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllRegions = `SELECT regionID, regionName FROM regions`
const insertRegion = `INSERT INTO regions
    (regionName, state)
    VALUES (?, ?)`

//get all regions request
router.get('/', (req, res) => {
    mysql.pool.query(getAllRegions, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

//insert region request
router.post('/', (req, res) => {
    let content = req.body
    mysql.pool.query(insertRegion,
        ([content.regionName, content.state]), (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.send(result)
            }
        })
})

module.exports = router