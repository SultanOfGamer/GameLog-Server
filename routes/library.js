
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users



router.get('/', (request,response)=>{
    if(userControl.isUser(request,response)) {

        response.send(request.user.nickname)
    }else{
        response.send({message:'please login!'})
    }

})

//
// router.get('/', (request,response)=>{
//     if(userControl.isUser(request,response)) {
//         console.log(request.user.nickname)
//     }
//
// })
//
// router.get('/', (request,response)=>{
//     if(userControl.isUser(request,response)) {
//         console.log(request.user.nickname)
//     }
//
// })


module.exports = router;
