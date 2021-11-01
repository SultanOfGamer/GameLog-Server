
const express = require('express')
const router = express.Router()

const userControl = require('../controll/index').users

// const shortid = require('shortid')
// const getDate = require('../util/index').date;
const bcrypt = require('bcrypt')

module.exports = function(passport){
    router.post('/login', function(request, response, next){
        passport.authenticate('login', function(err, user, info){
                if(err) return next(err)
                if(info) return response.status(403).send({
                    status:403,
                    message:info
                })
                request.logIn(user, function(err){
                    if(err) return next(err)
                    return response.status(200).send({
                        status: 200,
                        user:request.user,
                        message: 'welcome! ' + request.user.nickname
                    })
                })
            })(request, response, next);
        }
    )

    router.post('/logout', (request,response)=>{
        request.logout();
        request.session.destroy(function(){ // session을 지우는 function
            response.status(200).send({
                status: 200,
                message:'logout 성공!'
            })
        })
        // request.session.save(function () { //session 값을 저장함
        //     response.send({message:'logout!'})
        // })
    })

    router.post('/signup', (request,response)=>{
        if(request.body.password !== request.body.passwordConfirm){
            return response.status(403).send({
                status: 403,
                message:'Incorrect confirm password !'
            })
        }
        bcrypt.hash(request.body.password, 10, function(err, hash){
            userControl.signupInsert(request.body, hash)
                .then(()=>{
                    return response.status(200).json({
                        status: 200,
                        message: '회원가입 완료'
                    })
                }).catch((err)=>{
                return response.status(403).json({
                    status: 403,
                    message:'회원가입 실패',
                    error:err
                })
            })
        })
    })

    router.get('/validation/:value', async (request,response, next)=>{
        const value = request.params.value
        const queryString = request.query.value;
        let status ;
        let message ;
        switch(value){
            case 'email':
                if(!userControl.emailValidation(queryString)) {
                    return response.status(403)
                        .send({
                            status:403,
                            message: "이메일 형식이 아닙니다."
                        })
                }
                ({status, message} = await userControl.findEmailVal(queryString))
                response.status(status).send({
                    status: status,
                    message: message
                })
                break
            case 'nickname':
                ({status, message} = await userControl.findNickVal(queryString))
                response.status(status).send({
                    status: status,
                    message: message
                })
                break
            default:
                next()
                break
        }
    })
    return router
}


