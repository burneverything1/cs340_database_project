const express = require('express')
const router = express.Router()
const mysql = require('../dbcon')

const callbacks = require('./callbacks')

const attributes = ['plantID', 'environID', 'environImpact']

//queries
const getAllPlantEnviron = `SELECT * FROM plantEnvironImpacts`
const insertPlantEnviron = `INSERT INTO plantEnvironImpacts
    (plantID, environID, environImpact)
    VALUES (?, ?, ?)`
const getSinglePlantEnviron = `SELECT * FROM plantEnvironImpacts
    WHERE plantID =? AND environID=?`
const updatePlantEnviron = `UPDATE plantEnvironImpacts SET plantID=?, environID=?, environImpact=?
    where plantID =? AND environID=?`
const deletePlantEnviron = `DELETE FROM plantEnvironImpacts WHERE plantID =? AND environID=?`

// get all
router.get('/', (req, res) => {
    callbacks.getAll(req, res, getAllPlantEnviron)
})

// add
router.post('/', (req, res) => {
    callbacks.addPost(req, res, insertPlantEnviron, attributes)
})

// get single
router.get('/:plantID/:environID', (req, res) => {
    callbacks.getSingleComposite(req, res, getSinglePlantEnviron, req.params.plantID, req.params.environID)
})

// update
router.put('/:plantID/:environID', (req, res) => {
    callbacks.updateComposite(req, res, updatePlantEnviron, attributes, req.params.plantID, req.params.environID)
})

router.delete('/:plantID/:environID', (req, res) => {
    callbacks.deleteComposite(req, res, deletePlantEnviron, req.params.plantID, req.params.environID)
})

module.exports = router