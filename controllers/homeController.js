const express = require('express');
const router = express.Router();

const housingService = require('../services/housingService');


router.get('/', async (req, res) => {
    let housings = await housingService.getTopHouses();
    res.render('home', housings);
})



router.get('/search', (req, res) => {
    
    let housings = await housingService.search(req.query.text);

    res.render('search', housings);
})

module.exports = router;