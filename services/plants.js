const express = require('express')
const router = express.Router()

function getPlants(res, mysql) {
    mysql.pool.query("SELECT plantID, plantName FROM plants", (error, results) => {
        if(error){
            res.write(JSON.stringify(error))
            res.end();
        }
        
    })
}


exports.getPlants = getPlants