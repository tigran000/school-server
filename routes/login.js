const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const router = express.Router();

router.post('/login', (req, res) => {
    const { credentials } = req.body;
    const sql = ` SELECT * FROM users WHERE userName = '${credentials.userName}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        const user = result[0];
        if (user) {
            bcrypt
                .compare(credentials.password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        delete user.password;
                        jwt.sign({ user }, 'tigranssecretkey', (err, token) => {
                            res.json({
                                user,
                                token
                            });
                        });
                    } else res.status(401).send('UNAUTHORIZED');
                });
        } else res.status(401).send('UNAUTHORIZED');
    });
});

module.exports = router;