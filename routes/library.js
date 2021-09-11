
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


//user library 데이터 전송
//로그인 정보
//params page 필요
router.get('/', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        let page = request.params.page
        if(page === undefined) page = 0;

        try{
            const userLibraryList = await userGameControl.getUserGames(request.user, request.params.page)
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
// 무언가를 입력했을 때만 insert를 호출할 것

router.post('/insert', (request,response)=>{
    if(userControl.isUser(request,response)) {
        userGameControl.insertUserGames(request.user, request.body)
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
