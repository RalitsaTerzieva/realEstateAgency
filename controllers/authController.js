const express = require('express');
const router = express.Router();
const authService = require('../services/authService');


const renderRegister = (req, res) => {
    res.render('auth/register');
}

const renderLogin = (req, res) => {
    res.render('auth/login');
}

const register =  async (req, res) => {
    const { name, username, password, repeatpassword } = req.body;

    if(password !== repeatpassword) {
        res.locals.error = "Password missmatch!";
        return res.render('auth/register');
    }
    
    try {
        await authService.register({ name, username, password, repeatpassword });

        res.redirect('/');
    } catch(err) {
        res.render('404');
    }
   
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        await authService.login({ username, password });
        res.redirect('');
    } catch(err) {
        res.render('404');
    }
}


router.get('/register', renderRegister);
router.get('/login', renderLogin);
router.post('/register', register);
router.post('/login', login)

module.exports = router;