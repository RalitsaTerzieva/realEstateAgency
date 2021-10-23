const express = require('express');
const router = express.Router();


const register = (req, res) => {
    res.render('auth/register');
}

const login = (req, res) => {
    res.render('auth/login');
}

router.get('/register', register);
router.get('/login', login);

module.exports = router;