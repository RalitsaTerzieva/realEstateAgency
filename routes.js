// TODO: Require Controllers...
const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
const housingController = require('./controllers/housingController.js')


router.use('/home', homeController);
router.use('/auth', authController);
router.use('/housing', housingController);
router.use('/housing/create', housingController);


module.exports = router