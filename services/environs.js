const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

//queries
const getAllEnvirons = `SELECT environID, environName FROM environFactors`
const insertEnviron = `INSERT INTO environFactors
    (environName, plantEffect)
    VALUES (?, ?)`
const getSingleEnviron = `SELECT environID, environName FROM environFactors
    WHERE id = (?)`
const ``

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
    mysql.pool.query(insertEnviron, ([content.environName, content.plantEffect]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// get single environs request
router.get('/:id', (req, res) => {
    mysql.pool.query(getSingleEnviron, ([req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// update
router.put('/:id', (req, res) => {
    let content = req.body


})

module.exports = router