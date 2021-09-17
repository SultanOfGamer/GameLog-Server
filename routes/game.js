const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


//duplicated code

router.get('/', async (request,response)=>{
    const bar = request.params.tabOption;
    if(userControl.isUser(request,response)) {
        let page = request.query.page - 1 // pagination
        try{
            switch (bar){
                case 'library': // user library 전송
                    const userLibraryList = await userGameControl.getUserGames(request.user, page)
                    response.send(userLibraryList)
                    break;
                case 'wishlist': //user wishlist 전송
                    const wishlistData = await userGameControl.getUserWishGames(request.user, request.body, page)
                    response.send(wishlistData)
                default:
                    response.send({message:'라우팅 확인!'})
            }
        }catch(err){
            response.send(err)
        }
    }else{
        response.send({message:'please login!'})
    }
})

router.get('/', (request,response)=>{
    response.send('this is game')
})

module.exports = router;
