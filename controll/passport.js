const users = require('../models/userDatabase');
const bcrypt = require('bcrypt');


module.exports = function(app) {

    //세션 다음에 passport 가 실행되어야함.
    const passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;
    app.use(passport.initialize())
    app.use(passport.session())

    passport.serializeUser(function (user, done) {
        // console.log('serial', user.id)
        done(null, user.id);
    })

    passport.deserializeUser(function (id, done) {
        const user = users.findOne({id:id}, (err, user)=>{
            if(err) return err
            else if(user) return user
            else return 'user undefiend'
        });
        // console.log('deserialize', id, user)
        done(null, user);
    })

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            users.findOne({ email: email }, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { // user email이 없을 때
                        return done(null, false, { message: 'there is no email.' });
                    }else{
                        bcrypt.compare(password, user.password, function(err, result){
                            if(result){
                                return done(null, user);
                            }else{ // password가 일치하지 않을 때
                                return done(null, false,{message:'Incorrect password'})
                            }
                        })
                    }
                }
            )}
        )
    )

    return passport;
}
