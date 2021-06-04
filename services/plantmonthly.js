const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

const attributes = ['plantID', 'monthID', 'harvestReady', 'monthState']

//queries
const getAllPlantMonthly = `SELECT * FROM plantMonthlyState`
const insertPlantMonthly = `INSERT INTO plantMonthlyState
    (plantID, monthID, harvestReady, monthState)
    VALUES (?, ?, ?, ?)`
const getSinglePlantMonthly = `SELECT * FROM plantMonthlyState
    WHERE plantID =? AND monthID=?`
const updatePlantMonthly = `UPDATE plantMonthlyState SET plantID=?, monthID=?, harvestReady=?, monthState=?
    where plantID =? AND monthID=?`
const deletePlantMonthly = `DELETE FROM plantMonthlyState WHERE plantID =? AND monthID=?`

// get all
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllPlantMonthly)
})

// add
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertPlantMonthly, attributes)
})

// get single
router.get('/:plantID/:monthID', (req, res) => {
    callbacks.getSingleComposite(req, res, getSinglePlantMonthly, req.params.plantID, req.params.monthID)
})

// update
router.put('/:plantID/:monthID', (req, res) => {
    callbacks.updateComposite(req, res, updatePlantMonthly, attributes, req.params.plantID, req.params.monthID)
})

router.delete('/:plantID/:monthID', (req, res) => {
    callbacks.deleteComposite(req, res, deletePlantMonthly, req.params.plantID, req.params.monthID)
})

module.exports = router