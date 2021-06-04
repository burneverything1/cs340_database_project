const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

const attributes = ['plantID', 'monthID', 'harvestReady', 'monthState']

//queries
const getAllPlantMonthly = `SELECT * FROM plantMonthly`
const insertPlantMonthly = `INSERT INTO plantMonthly
    (plantID, monthID, harvestReady, monthState)
    VALUES (?, ?, ?, ?)`

// get all
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllRegionEnv)
})

// add
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

router.delete('/:environID/:regionID', (req, res) => {
    callbacks.deleteComposite(req, res, deleteEnviron, req.params.environID, req.params.regionID)
})

module.exports = router