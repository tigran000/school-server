const express = require('express');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/profile', isAuth, (req, res) => {
    const { user } = req.token
    // will add sql request if needed
    res.json({ user });
});

module.exports = router;