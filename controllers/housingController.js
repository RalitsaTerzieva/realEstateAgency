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
    const { name, type, year, city, image, description, pieces } = req.body;

    await housingService.create({name, type, year, city, image, description, pieces})
    res.redirect('/housing');
})

module.exports = router;