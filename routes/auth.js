
const express = require('express')
const router = express.Router()

const users = require('../models/userDatabase');

const shortid = require('shortid')
const bcrypt = require('bcrypt')
const getDate = require('../util/index').date;

module.exports = function(passport){
    // router.post('/login', (request,response,next)=>{
    //     passport.authenticate('login', function(err, user, info) {
    //         if (err) { return next(err); }
    //         if (!user) { return response.send('user undefined!'); }
    //         // response.logIn(user, function(err) {
    //         //     if (err) { return next(err); }
    //         //     return response.send(user.username);
    //         // });
    //     })(request, response, next);
    // })
    //TODO Login 성공 시에 처리
    router.post('/login',
        passport.authenticate('login', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    )

    router.get('/logout', (request,response)=>{
        request.logout();
        // req.session.destroy(function(){ // session을 지우는 function
        //     res.redirect('/')
        // })
        request.session.save(function () { //session 값을 저장함
            response.send('logout!')
        })
    })

    router.post('/signup', (request,response)=>{
        if(request.body.password !== request.body.passwordConfirm){
            return response.send('Incorrect confirm password !')
        }
        bcrypt.hash(request.body.password, 10, function(err, hash){
            const newUser = new users(request.body);
            newUser.id = shortid.generate();
            newUser.signDate = getDate();
            newUser.password = hash;

            newUser.save((err)=>{
                if(err) return response.status(500).json({message: 'failure save'})
                else return response.status(200).json({message:'회원가입 완료'})
            })
        })
    })

    router.post('/validation/:value', (request,response)=>{
        console.log(request.params.value)
        const value = request.params.value
        const queryString = request.query.value;
        console.log(queryString)
        switch(value){
            case 'email':
                users.findOne({email:queryString}, function(err, user){
                    if(err) response.send(err)
                    if(!user) response.send(true)
                    else response.send(false)
                })
                break
            case 'nickname':
                users.findOne({nickname:queryString}, function(err, user){
                    if(err) response.send(err)
                    if(!user) response.send(true)
                    else response.send(false)
                })
                break
            default:
                response.send('error page')
                break
        }

    })
    return router
}


