const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllPlants = `SELECT plantID, plantName FROM plants`
const insertPlant = `INSERT INTO plants 
    (plantName, harvestSeasonStart, harvestSeasonEnd, flavorProfile, eatenRaw, howToCook) 
    VALUES (?, ?, ?, ?, ?, ?)`

//get all plants request
router.get('/', (req, res) => {
    mysql.pool.query(getAllPlants, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

router.post('/', (req, res) => {
    let content = {}
    content = req.body
    mysql.pool.query(insertPlant, 
        ([content.plantName, content.harvestSeasonStart, content.harvestSeasonEnd, content.flavorProfile, content.eatenRaw, content.howToCook]),
        (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.send(result)
            }
        })
})

module.exports = router