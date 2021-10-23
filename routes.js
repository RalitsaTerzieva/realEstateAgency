// TODO: Require Controllers...
const express = require('express');
const router = express.Router();
const homeController = require('./controllers/homeController.js');
const authController = require('./controllers/authController.js');
//const cubController = require('./controllers/cubController.js')
//const accessoryController = require('./controllers/accessoryController.js');

router.get('/', (req, res) => {
    res.render('home')
})


router.get(homeController);
router.get('/register', authController);


module.exports = router