const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/index').users
const gameControl = require('../controll/index').games;
const userRecommand = require('../controll/index').userRecommand;

const shuffle = require('../util/index').shuffleArray

//선택된 하나의 게임 detail 전송
router.get('/select', async (request, response)=>{
    const gameId = request.query.gameId
    const user = request.user;
    let sendObj = {};
    if(userControl.isUser(request,response)) {//로그인 O game library 혹은 wish 정보 전송
        gameControl.checkSelectedGame(user, gameId)
            .then(data=>{
                gameControl.getSelectedGame(gameId)
                    .then(dataDetail=>{
                        sendObj['userGame'] = data;
                        sendObj['gameDetail'] = dataDetail
                        response.json(sendObj)
                    })
            })
    }else{ //로그인 X game detail만
        gameControl.getSelectedGame(gameId)
            .then(dataDetail=>{
                sendObj['userGame'] = undefined;
                sendObj['gameDetail'] = dataDetail
                response.json(sendObj)
            })
    }
})

//home game list load
router.get('/', async (request,response, next)=>{
    let sendObj = {};
    if(userControl.isUser(request,response)){ // 로그인 세션 성공시에 회원별 데이터 전송
        try{
            const preferArr = request.user.preferCategory
            if(preferArr.length === 0) //prefer가 없을시 에러처리
                throw '유저의 선호 카테고리를 입력해 주십시오.'
            const tempPromise = preferArr.map(async (elem)=>{
                return new Promise(function(resovle){
                    gameControl.getGameQuery(elem.category, elem.name)
                        .then(r=>{
                            let tempObj = {};
                            tempObj['type'] = elem.name;
                            tempObj['game'] = r;
                            resovle(tempObj)
                        })
                })
            })
            Promise.all(tempPromise).then(r=>{
                userRecommand.recommandGameList(request.user)
                    .then(recoGame=>{
                        r.unshift({'type':'recommand', 'game':recoGame})
                        gameControl.getPopularGame()
                            .then(popularData=>{ // 유명 게임 포함 전송
                                r.unshift({'type':'popular', 'game':popularData})
                                sendObj.status = 200
                                sendObj.message = "success home data"
                                sendObj.data = r
                                response.status(200).send(sendObj)
                            })
                    })
            })
        }catch(err){
            next(err)
        }
    }else{ //로그인 X, 첫 페이지 데이터 전송
        try{
            let page2 = Math.floor(Math.random() * 11)
            const themesData = await gameControl.getCategory('themes', page2, 2)
            const tempThemesData = themesData.map(async function(category){
                return new Promise(function(resolve){
                    gameControl.getGame('themes', category.name)
                        .then(r=>{
                            let tempObj = {};
                            tempObj['type'] = category.name;
                            tempObj['game'] = r;
                            resolve(tempObj)
                        })
                })
            })
            //genres default data
            let page = Math.floor(Math.random() * 5);
            let genresData = await gameControl.getCategory('genres', page)
            let tempPromise = genresData.map(async function(genres){
                return new Promise(function(resolve){
                    gameControl.getGame('genres', genres.name)
                        .then(r=>{
                            let tempObj = {};
                            //genres 이름
                            tempObj['type'] = genres.name;
                            tempObj['game'] = r;
                            resolve(tempObj)
                        })
                })
            })
            let sendPromise = tempPromise;
            //genres 데이터 개수가 3개 일때 themes 예외처리
            if(page === 4) sendPromise = tempPromise.concat(tempThemesData)

            Promise.all(sendPromise).then(r=>{
                gameControl.getPopularGame()
                    .then(popularData=>{ // 유명 게임 포함 전송
                        r = shuffle(r)
                        r.unshift({'type':'popular', 'game':popularData})
                        sendObj.status = 200
                        sendObj.message = "success home data"
                        sendObj.data = r
                        response.status(200).send(sendObj)
                    })
            })
        }catch(err){
            next(err)
        }
    }
})

module.exports = router;
