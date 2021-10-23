// TODO: Require Controllers...
const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homeController.js');
//const cubController = require('./controllers/cubController.js')
//const accessoryController = require('./controllers/accessoryController.js');
//const authController = require('./controllers/authController.js');
router.get('/', (req, res) => {
    res.render('home')
})


router.get(homeController);


module.exports = router