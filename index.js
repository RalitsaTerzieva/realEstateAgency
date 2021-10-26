const express = require("express");
const configEnv = require('./config/config.js')[process.env.NODE_ENV]
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes');
const initialDatabase = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const app = express();

app.use(express.urlencoded({extended: true}));
require('./config/handlebars')(app);
app.use('/static', express.static(path.resolve(__dirname, './static')));
app.use(cookieParser);
app.use(auth);
app.use(routes);


initialDatabase()
    .then(() => {
        app.listen(configEnv.port);
    })
    .catch(err => {
        console.log('Cannot connect database!', err);
    })


