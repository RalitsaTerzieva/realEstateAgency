const { AUTH_COOKI_NAME, JWT_SECRET } = require('../constants');
const jwt = require('../utils/jwt');

exports.auth = function(req, res, next) {
    
    let token = req.cookies(AUTH_COOKI_NAME);

    if(token) {
        jwt.verify(token, JWT_SECRET)
            .then(decodedToken => {
                res.user = decodedToken;
                res.locals.user = decodedToken;
                next();
            })
            .catch(err => {
                res.clearCokkie(AUTH_COOKI_NAME);
                res.render('404');
            })
    } else {
        next();
    }
}

exports.isAuth = function(req, res, next) {
    if(req.user) {
        next();
    } else {
        res.render('404');
    }
}

exports.isGuest = function(req, res, next) {
    if(!req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
