const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require('../constants');
const { isGuest, isAuth } = require('../middlewares/authMiddleware'); 


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
        let token = await authService.login({username, password});
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch(err) {
        res.render('404');
    }
   
}

const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        let token = await authService.login({ username: name, password: password });
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch(err) {
        console.log(err)
        res.render('404');
    }
}

const logout = async (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
}


router.get('/register', isGuest,  renderRegister);
router.get('/login', isGuest, renderLogin);
router.post('/register', isGuest, register);
router.post('/login', isGuest, login);
router.get('/logout', isAuth,  logout);

module.exports = router;