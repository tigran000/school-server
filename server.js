const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const isAuth = require('./is-auth');
const app = express();
app.use(bodyParser.json());

const db = [{
    userName: 'ff',
    password: 1111,
    isAdmin: true
},
{
    userName: 'Vaxo',
    password: 0000,
    isAdmin: false
}]


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/login', (req, res) => {
    const { credentials } = req.body
    const user = db.find(user => (user.userName == credentials.userName) &&
        (user.password == credentials.password))
    if (user) {
        jwt.sign({ user }, 'tigranssecretkey', (err, token) => {
            res.json({
                user,
                token
            });
        });
    } else res.json(user)
});

app.get('/profile', isAuth, (req, res) => {
    const { user } = req.token
    res.json({ user })
});



app.listen(8000, () => {
    console.log('Server started on port 8000');
});