const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;

//TODO 쿼리별 데이터 받아오기 argument 수정
//Library & Wishlist

router.get('/:tabOption/get', async (request,response)=>{
    const bar = request.params.tabOption;
    if(userControl.isUser(request,response)) {
        let page = request.query.page - 1 // pagination
        try{
            switch (bar){
                case 'library': // user library 전송
                    const userLibraryList = await userGameControl.getUserGames(request.user, page)
                    response.json({
                        message:'success response',
                        data:userLibraryList
                    })
                    break;
                case 'wishlist': //user wishlist 전송
                    const wishlistData = await userGameControl.getUserWishGames(request.user, request.body, page)
                    response.json({
                        message:'success response',
                        data:wishlistData
                    })
                    break;
                default:
                    response.json({message:'라우팅 확인!'})
            }
        }catch(err){
            response.json({message:err})
        }
    }else{
        response.json({message:'please login!'})
    }
})


router.post('/:tapbar/insert', (request,response)=>{
    if(userControl.isUser(request,response)) {
        userGameControl.insertUserGames(request.user, request.body)
            .then(()=>{
                return response.json({message:'insert success'})
            }).catch((err)=>{
                return response.json({message:'insert fail', err:err})
        })
    }else{
        response.json({message:'please login!'})
    }
})

//user library 데이터 업데이트
// 해당하는 user, id를 찾아서 데이터 변경
// body -> 게임 id(number), 게임평가(number), 게임 평가(text), 게임 메모(text), 게임 status
// body -> gameId, userGameEval, userGameEvalText, userGameMemo, userGameStatus 필요
router.post('/:tapbar/update', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        const sendMessage = await userGameControl.updateUserGames(request.user, request.body)
            .catch((err)=> {
                return response.json({message: 'update fail', err: err})
            })
        response.json(sendMessage)
    }else{
        response.json({message:'please login!'})
    }
})

//user library 데이터 삭제
//삭제하는 id 전송후 삭제
// null, 빈칸 입력 혹은 유저가 삭제했을 시
router.post('/:tapbar/delete', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        const sendMessage = await userGameControl.deleteUserGames(request.body)
        response.json(sendMessage)
    }else{
        response.json({message:'please login!'})
    }
})

module.exports = router;
