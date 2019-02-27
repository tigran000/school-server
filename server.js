const express = require('express');
const mysql = require('mysql')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const isAuth = require('./is-auth');
const app = express();
app.use(bodyParser.json());


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'emerson59',
    database: 'testdb'
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/login', (req, res) => {
    const { credentials } = req.body
    const sql = ` SELECT userName, isAdmin  FROM users WHERE userName = '${credentials.userName}' AND password = '${credentials.password}' `
    db.query(sql, (err, result) => {
        if (err) throw err;
        const user = result[0]
        console.log(user)
         user ? user.isAdmin = Boolean(user.isAdmin) : undefined
        jwt.sign({ user }, 'tigranssecretkey', (err, token) => {
            res.json({
                user,
                token
            });
        });
    })
});

app.get('/profile', isAuth, (req, res) => {
    const { user } = req.token
    // will add sql request at later
    res.json({ user })
});



app.listen(8000, () => {
    console.log('Server started on port 8000');
});