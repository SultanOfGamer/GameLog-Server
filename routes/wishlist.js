
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


router.get('/', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        let page = request.query.page - 1 // pagination
        const wishlistData = await userGameControl.getUserWishGames(request.user, request.body, page)
        response.send(wishlistData)
    }else{
        response.send({message:'please login!'})
    }
})

router.post('/insert', (request,response)=>{
    if(userControl.isUser(request,response)) {
        userGameControl.insertUserGames(request.user, request.body)
        response.send({message:'insert success'})
    }else{
        response.send({message:'please login!'})
    }
})


module.exports = router;
