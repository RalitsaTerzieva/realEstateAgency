const express = require('express');
const router = express.Router();


const register = (req, res) => {
    res.render('auth/register');
}

router.get('register', home);