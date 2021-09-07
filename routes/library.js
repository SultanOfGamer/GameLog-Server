
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


router.get('/', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        try{
            const userLibraryList = await userGameControl.getUserGames(request.user)
            response.send(userLibraryList)
        }catch(err){
            response.send(err)
        }
    }else{
        response.send({message:'please login!'})
    }

})
1
router.post('/insert', (request,response)=>{
    if(userControl.isUser(request,response)) {
        const gameId = request.body.gameId;

        userGameControl.addUserGames(request.user, gameId)
        response.send('insert success')
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
