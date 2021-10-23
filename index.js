const express = require("express");
const configEnv = require('./config/config.js')
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes');
const initialDatabase = require('./config/database');

const app = express();


require('./config/handlebars')(app);
app.use('/static', express.static(path.resolve(__dirname, './static')));
app.use(routes);
//app.use(configEnv);

initialDatabase()
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log('Cannot connect database!');
    })


