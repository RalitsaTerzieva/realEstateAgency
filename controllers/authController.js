const express = require('express');
const router = express.Router();
const authService = require('../services/authService');


const renderRegister = (req, res) => {
    res.render('auth/register');
}

const login = (req, res) => {
    res.render('auth/login');
}

const register =  async (req, res) => {
    const { name, username, password, repeatpassword } = req.body;

    await authService.register({ name, username, password, repeatpassword });

    res.redirect('/');
}



router.get('/register', renderRegister);
router.get('/login', login);
router.post('/register', register);

module.exports = router;