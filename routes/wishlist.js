
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


//user wishlist get router
//로그인 정보
//query page
// router.get('/', async (request,response)=>{
//     if(userControl.isUser(request,response)) {
//         let page = request.query.page - 1 // pagination
//         try{
//             const wishlistData = await userGameControl.getUserWishGames(request.user, request.body, page)
//             response.send(wishlistData)
//         }catch(err){
//             response.send(err)
//         }
//     }else{
//         response.send({message:'please login!'})
//     }
// })

//wish list insert
//로그인정보
// library insert와 duplicated code
// router.post('/insert', (request,response)=>{
//     if(userControl.isUser(request,response)) {
//         userGameControl.insertUserGames(request.user, request.body)
//             .then(()=>{
//                 return response.send({message:'insert success'})
//             }).catch((err)=> {
//             return response.send({message: 'insert fail', err: err})
//         })
//     }else{
//         response.send({message:'please login!'})
//     }
// })

// router.post('/delete', async (request,response)=>{
//     if(userControl.isUser(request,response)) {
//         const sendMessage = await userGameControl.deleteUserGames(request.body)
//         response.send(sendMessage)
//     }else{
//         response.send({message:'please login!'})
//     }
// })

module.exports = router;
