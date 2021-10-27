const express = require('express');
const router = express.Router();

const housingService = require('../services/housingService');


const home = async (req, res) => {
    let housings = await housingService.getTopHouses();
    res.render('home', housings);
}

router.get('/', home);

module.exports = router;