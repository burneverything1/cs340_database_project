const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

const attributes = ['environID', 'regionID']

//queries
const getAllRegionEnv = `SELECT * FROM regionEnviron`
const insertRegionEnviron = `INSERT INTO regionEnviron
    (environID, regionID)
    VALUES (?, ?)`
const getSingleRegionEnviron = `SELECT * FROM regionEnviron
    WHERE environID = (?) AND regionID = (?)`
const updateRegionEnv = `UPDATE regionEnviron SET environID=?, regionID=?
    WHERE environID=? AND regionID=?`

// get all regionEnviron
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllRegionEnv)
})

// add regionEnviron
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertRegionEnviron, attributes)
})

// get single
router.get('/:environID/:regionID', (req, res) => {
    callbacks.getSingleComposite(req, res, getSingleRegionEnviron, req.params.environID, req.params.regionID)
})

// update
router.put('/:environID/:regionID', (req, res) => {
    callbacks.updateComposite(req, res, updateRegionEnv, attributes, req.params.environID, req.params.regionID)
})

module.exports = router