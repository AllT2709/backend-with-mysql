const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

require('dotenv').config();

passport.use('jwt', new JWTStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken
}, function(token,done){
    try{
        console.log(token.user.email);
        return done(null, token.user);
    }catch(err){
        return done(err, null);
    }
}))