
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;

const userGameModel = require('../models/index').getUserGames;


router.get('/', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        try{
            const userLibraryList = await userGameControl.getUserGames(request.user, userGameModel)
            console.log(userLibraryList)

        }catch(err){

        }

        response.send('this library')
    }else{
        response.send({message:'please login!'})
    }

})

router.post('/insert', (request,response)=>{
    if(userControl.isUser(request,response)) {
        userGameControl.addUserGames(request.user, userGameModel)
        response.send(request.user)
    }else{
        response.send({message:'please login!'})
    }

})

router.get('/update', (request,response)=>{
    if(userControl.isUser(request,response)) {
        console.log(request.user.nickname)
    }

})

router.get('/delete', (request,response)=>{
    if(userControl.isUser(request,response)) {
        console.log(request.user.nickname)
    }

})




module.exports = router;
