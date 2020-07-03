const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const Authentication = require('../controllers/authentication')

passport.use(new BearerStrategy(
    function(token, done) {
        try{
            const user = Authentication.validateToken(token);
            console.log(user);
            done(null,user);
        } catch (e) {
           done(null)
        }
    }
));

