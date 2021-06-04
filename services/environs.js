const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

//queries
const getAllEnvirons = `SELECT environID, environName FROM environFactors`
const insertEnviron = `INSERT INTO environFactors
    (environName, plantEffect)
    VALUES (?, ?)`
const getSingleEnviron = `SELECT * FROM environFactors
    WHERE environID = (?)`
const updateEnviron = `UPDATE environFactors SET environName=?, plantEffect=?
    WHERE environID = ?`
const deleteEnviron = `DELETE FROM environFactors WHERE environID = (?)`

//get all environs request
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllEnvirons)
})

//add environs request
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertEnviron, ['environName', 'plantEffect'])
})

// get single environs request
router.get('/:id', (req, res) => {
    callbacks.getSingle(req, res, getSingleEnviron, req.params.id)

    /*
    mysql.pool.query(getSingleEnviron, ([req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
    */
})

// update
router.put('/:id', (req, res) => {
    let content = req.body
    mysql.pool.query(updateEnviron, ([content.environName, content.plantEffect, req.params.id]), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// delete
router.delete('/:id', (req, res) => {
    mysql.pool.query(deleteEnviron, ([req.params.id]), (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

module.exports = router