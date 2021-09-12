
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


//user library 데이터 전송
//로그인 정보
//query page 필요
router.get('/', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        let page = request.query.page - 1 //pagination
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
            .then(()=>{
                return response.send({message:'insert success'})
            }).catch((err)=>{
                return response.send({message:'insert fail', err:err})
        })
    }else{
        response.send({message:'please login!'})
    }
})

//user library 데이터 업데이트
// 해당하는 user, id를 찾아서 데이터 변경
// body -> 게임 id(number), 게임평가(number), 게임 평가(text), 게임 메모(text), 게임 status
// body -> gameId, userGameEval, userGameEvalText, userGameMemo, userGameStatus 필요
router.post('/update', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        const sendMessage = await userGameControl.updateUserGames(request.user, request.body)
            .catch((err)=> {
                return response.send({message: 'update fail', err: err})
            })
        response.send(sendMessage)
    }else{
        response.send({message:'please login!'})
    }
})

//user library 데이터 삭제
//삭제하는 id 전송후 삭제
// null, 빈칸 입력 혹은 유저가 삭제했을 시
router.post('/delete', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        const sendMessage = await userGameControl.deleteUserGames(request.body)
        response.send(sendMessage)
    }else{
        response.send({message:'please login!'})
    }
})




module.exports = router;
