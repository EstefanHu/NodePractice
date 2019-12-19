'use strict';
const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...')
    });
});

app.get('/deletedb', (req, res) => {
    let sql = 'DROP DATABASE IF EXISTS nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database deleted!');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000')
});