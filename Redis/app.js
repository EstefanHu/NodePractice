'use strict';
const express = require('express');
const redis = require('redis');
const mysql = require('mysql');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const async = require('async');
const client = redis.createClient();
const app = express();
const router = express.Router();

const pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'redis_demo',
    debug    :  false
});

app.set('views', path.join(__dirname,'../','views'));
app.engine('html', require('ejs').renderFile);

app.use(session({
    secret: 'ssshhhhh',
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));
app.use(cookieParser("secretSign#143_!223"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function handle_database(req,type,callback) {
  	async.waterfall([
	function(callback) {
		pool.getConnection(function(err,connection){
			if(err) {
			callback(true);
			} else {
			callback(null,connection);
			}
		});
	},
	function(connection,callback) {
		var SQLquery;
		switch(type) {
			case "login" :
				SQLquery = "SELECT * from user_login WHERE user_email='"+req.body.user_email+"' AND `user_password`='"+req.body.user_password+"'";
				break;
			case "checkEmail" :
				SQLquery = "SELECT * from user_login WHERE user_email='"+req.body.user_email+"'";
				break;
			case "register" :
				SQLquery = "INSERT into user_login(user_email,user_password,user_name) VALUES ('"+req.body.user_email+"','"+req.body.user_password+"','"+req.body.user_name+"')";
				break;
			case "addStatus" :
				SQLquery = "INSERT into user_status(user_id,user_status) VALUES ("+req.session.key["user_id"]+",'"+req.body.status+"')";
				break;
			case "getStatus" :
				SQLquery = "SELECT * FROM user_status WHERE user_id="+req.session.key["user_id"];
				break;
			default :
				break;
		}
		callback(null,connection,SQLquery);
	},
	function(connection,SQLquery,callback) {
		connection.query(SQLquery,function(err,rows){
			connection.release();
		if(!err) {
			if(type === "login") {
				callback(rows.length === 0 ? false : rows[0]);
			} else if(type === "getStatus") {
						callback(rows.length === 0 ? false : rows);
					} else if(type === "checkEmail") {
						callback(rows.length === 0 ? false : true);
					} else {
						callback(false);
					}
			} else {
				callback(true);
			}
		});
	}],
	function(result){
		if(typeof(result) === "boolean" && result === true) {
			callback(null);
		} else {
			callback(result);
		}
	});
}

router.get('/', (req, res) => {
	res.render('index.html');
});

router.post('/login', (req, res) => {
	handle_database(req, 'login', (response) => {
		if(response === null) {
			res.json({"error": "true", "message": "Database error occured"});
		} else {
			if(!response) {
				res.json({"error": "true", "message": "Login failed. Please register"});
			} else {
				req.session.key = response;
				res.json({"error": false, "message": "Login success"});
			}
		}
	});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});