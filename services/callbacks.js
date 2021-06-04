const express = require('express')
const mysql = require('../dbcon')

const getAll = (req, res, query) => {
    mysql.pool.query(query, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

const addPost = (req, res, query, attributes) => {
    let content = req.body
    let inputs = []
    attributes.forEach(element => {
        inputs.push(content[element])
    });

    mysql.pool.query(query, (inputs), (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
}

exports.getAll = getAll
exports.addPost = addPost