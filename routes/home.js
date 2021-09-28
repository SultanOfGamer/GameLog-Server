const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/index').users
const gameControl = require('../controll/index').games;


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

//home game list load
// TODO pagination 끝 부분 일 시 어떻게 처리해야할지 고민
router.get('/', async (request,response)=>{
    if(userControl.isUser(request,response)){ // 로그인 세션 성공시에 회원별 데이터 전송
        try{
            //genresData를 user genres로 편의성 맞게 변경
            const genresData = await gameControl.getCategory('genres')
            const tempPromise = genresData.map(async function(genres){
                return new Promise(function(resolve){
                    gameControl.getGameQuery(genres.name)
                        .then(r=>{
                            let tempObj = {};
                            tempObj['type'] = genres.name;
                            tempObj['game'] = r;
                            resolve(tempObj)
                        })
                })
            })
            Promise.all(tempPromise).then(r=>{
                gameControl.getPopularGame()
                    .then(popularData=>{ // 유명 게임 포함 전송
                        r.unshift({'type':'popular', 'game':popularData})
                        response.send(r)
                    })
            })
        }catch(err){
            response.json(err)
        }
    }else{ //로그인 X, 첫 페이지 데이터 전송
        try{
            //genresData를 user genres로 편의성 맞게 변경
            let page = Math.floor(Math.random() * 5);
            const genresData = await gameControl.getCategory('genres', page)

            const tempPromise = genresData.map(async function(genres){
                return new Promise(function(resolve){
                    gameControl.getGame(genres.name)
                        .then(r=>{
                            let tempObj = {};
                            tempObj['type'] = genres.name;
                            tempObj['game'] = r;
                            resolve(tempObj)
                        })
                })
            })
            Promise.all(tempPromise).then(r=>{
                gameControl.getPopularGame()
                    .then(popularData=>{ // 유명 게임 포함 전송
                        r.unshift({'type':'popular', 'game':popularData})
                        response.send(r)
                    })
            })
        }catch(err){
            response.json(err)
        }
    }
})

module.exports = router;
