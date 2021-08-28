
const express = require('express')
const router = express.Router()

const users = require('../models/userDatabase');
const passport = require('../controll/passport')

const shortid = require('shortid')
const getDate = require('../util/date')


router.post('/login', (request,response)=>{
    users.findOne({email:request.body.email, password:request.body.password}, (err, user)=>{
        if(err) return response.status(500).json({message: '에러!'});
        else if(user) return response.status(200).json({message:'find user', data:user});
        else return response.stauts(404).json({message:'user undefined'});
    });

})

router.get('/logout', (request,response)=>{

})



router.post('/signup', (request,response)=>{
    if(request.body.password !== request.body.passwordConfirm){
        return response.send('Incorrect confirm password !')
    }
    const newUser = new users(request.body);
    newUser.id = shortid.generate();
    newUser.signDate = getDate();
    newUser.save((err)=>{
        if(err) return response.status(500).json({message: 'failure save'})
        else return response.status(200).json({message:'save success'})
    })
})

module.exports = router;