const express = require('express');
const router = express.Router();

const housingService = require('../services/housingService');


router.get('/', (req, res) => {
    res.render('/housing');
})

router.get('/create', (req, res) => {
    res.render('/housing/create');
})

router.post('/create',  async (req, res) => {
    await housingService.create({...req.body, req.user._id})
    res.redirect('/housing');
})

module.exports = router;