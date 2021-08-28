const users = require('../models/userDatabase');
const bcrypt = require('bcrypt');


module.exports = function(app) {

    //세션 다음에 passport 가 실행되어야함.
    const passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser(function (user, done) {

    })
    passport.deserializeUser(function (id, done) {
    })

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {

        }
    ))
    return passport;
}
