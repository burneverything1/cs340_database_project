const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllRegionEnv = `SELECT * FROM regionEnviron`
const insertRegionEnviron = `INSERT INTO regionEnviron
    (environID, regionID)
    VALUES (?, ?)`

// get all regionEnviron
router.get('/', (req, res) => {

})

// add regionEnviron
router.post('/', (req, res) => {
    let content = req.body
    
})