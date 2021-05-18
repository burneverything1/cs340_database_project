const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('port', 3000)

//import express routers
const plants = require('./services/plants')
const months = require('./services/months')
const environs = require('./services/environs')
const regions = require('./services/regions')
const users = require('./services/users')

//add express routers
app.use('/plants', plants)
app.use('/months', months)
app.use('/environs', environs)
app.use('/regions', regions)
app.use('/users', users)


app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
})