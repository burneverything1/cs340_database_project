const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mysql = require('./dbcon.js')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('port', 3000)

//middleware
app.use('/static', express.static('public'))
//app.set('mysql', mysql)
app.use('/plants', require('./services/plants'))

app.use('/', express.static('public'))

//error handlers
app.use(function(req,res){
    res.status(404)
    res.render('404')
})

app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
})