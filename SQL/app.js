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

app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts trable created...');
    });
});

app.get('/addpost1', (req, res) => {
    let post = {title: 'Post one', body: 'this is a post'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post one added');
    });
});

app.get('/addpost2', (req, res) => {
    let post = {title: 'Post two', body: 'this is a post'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post two added');
    });
});

app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post fetched');
    });
});

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send(`Post ${req.params.id} fetched`);
    });
});

app.get('/updatepost/:id', (req, res) => {
    let sql = `DELETE posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated');
    });
});

app.get('/deletepost/:id', (req, res) => {
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000')
});