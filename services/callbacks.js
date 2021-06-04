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

exports.getAll = getAll