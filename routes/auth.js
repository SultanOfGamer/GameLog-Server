
const express = require('express')
const router = express.Router()

// const users = require('../models/userDatabase');

const userControl = require('../controll/index').users

// const shortid = require('shortid')
// const getDate = require('../util/index').date;
const bcrypt = require('bcrypt')

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
            // successRedirect: '/',
            // failureRedirect: '/login'
        }), (request,response)=>{
            if(request.user){ //로그인성공
                response.send('welcome! ' + request.user.nickname)
            }
        }
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
            userControl.signupInsert(request.body, hash)
                .then(()=>{
                    return response.status(500).json({message: '회원가입 완료'})
                }).catch((err)=>{
                    return response.status(200).json({message:'회원가입 실패', err:err})
                })
        })
    })

    router.post('/validation/:value', async (request,response)=>{
        const value = request.params.value
        const queryString = request.query.value;
        let sendMessage = {};
        switch(value){
            case 'email':
                if(!userControl.emailValidation(queryString)) return response.send({message:"이메일 형식이 아닙니다."})
                sendMessage = await userControl.findEmailVal(queryString)
                response.send(sendMessage)
                break
            case 'nickname':
                sendMessage = await userControl.findNickVal(queryString)
                response.send(sendMessage)
                break
            default:
                response.send('error page')
                break
        }

    })
    return router
}


