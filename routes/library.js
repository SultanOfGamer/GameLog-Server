
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


//user library 데이터 전송
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

//user library 데이터 추가
//로그인 정보
// body -> 게임 id(number), 게임평가(number), 게임 평가(text), 게임 메모(text), 게임 status
// body -> gameId, userGameEval, userGameEvalText, userGameMemo, userGameStatus 필요
router.post('/insert', (request,response)=>{
    if(userControl.isUser(request,response)) {
        const gameId = request.body.gameId;

        userGameControl.insertUserGames(request.user, gameId)
        response.send('insert success')
    }else{
        response.send({message:'please login!'})
    }
})

//user library 데이터 업데이트
// 해당하는 user, gameId를 찾아서 데이터 변경
router.post('/update', (request,response)=>{
    if(userControl.isUser(request,response)) {
        console.log(request.user.nickname)
    }

})

//user library 데이터 삭제
router.post('/delete', (request,response)=>{
    if(userControl.isUser(request,response)) {
        console.log(request.user.nickname)
    }
})




module.exports = router;
