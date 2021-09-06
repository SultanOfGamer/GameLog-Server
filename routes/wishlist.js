
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users

router.get('/', (request,response)=>{
    if(userControl.isUser(request,response)) {
        // response.send(request.user.nickname)
        response.send('this is your wishlist')
    }else{
        response.send({message:'please login!'})
    }

})

module.exports = router;
