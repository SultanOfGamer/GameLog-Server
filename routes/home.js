const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/index').users
const gameControl = require('../controll/index').games;


//aggregated_rating_count , aggregated_rating 순 Game 정렬
router.get('/popular', async (request,response)=>{
    try{
        const data = await gameControl.getPopularGame()
        response.json(data)
    }catch(err){
        response.send(err)
    }
})

//선택된 하나의 게임 detail 전송
router.get('/select', async (request, response)=>{
    const gameId = request.query.gameId
    const user = request.user;

    let sendObj = {};
    if(userControl.isUser(request,response)) {//game library 혹은 wish 정보 전송
        gameControl.checkSelectedGame(user, gameId)
            .then(data=>{
                gameControl.getSelectedGame(gameId)
                    .then(dataDetail=>{
                        sendObj['userGame'] = data;
                        sendObj['gameDetail'] = dataDetail
                        response.json(sendObj)
                    })
            })
    }else{ //game detail만
        gameControl.getSelectedGame(gameId)
            .then(dataDetail=>{
                sendObj['userGame'] = undefined;
                sendObj['gameDetail'] = dataDetail
                response.json(sendObj)
            })
    }
})

//query page
router.get('/', async (request,response)=>{
    if(userControl.isUser(request,response)){ // 로그인 세션 성공시에 회원별 데이터 전송
        try{
            //genresData를 user genres로 편의성 맞게 변경
            const genresData = await gameControl.getCategory('genres')

            const tempPromise = genresData.map(async function(genres){
                return new Promise(function(resolve){
                    gameControl.getGameQuery(genres.name)
                        .then(r=>{
                            let tempDict = {};
                            tempDict['type'] = genres.name;
                            tempDict['game'] = r;
                            resolve(tempDict)
                        })
                })
            })
            Promise.all(tempPromise).then(r=>{
                response.send(r)
            })
        }catch(err){
            response.json(err)
        }
    }else{ //로그인 X, 첫 페이지 데이터 전송
        try{
            //genresData를 user genres로 편의성 맞게 변경
            const page = Math.floor(Math.random() * 5);
            const genresData = await gameControl.getCategory('genres', page)

            const tempPromise = genresData.map(async function(genres){
                return new Promise(function(resolve){
                    gameControl.getGame(genres.name)
                        .then(r=>{
                            let tempDict = {};
                            tempDict['type'] = genres.name;
                            tempDict['game'] = r;
                            resolve(tempDict)
                        })
                })
            })
            Promise.all(tempPromise).then(r=>{
                response.send(r)
            })
        }catch(err){
            response.json(err)
        }
    }
})

module.exports = router;
