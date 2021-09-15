const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/index').users
const gameControl = require('../controll/index').games;

router.get('/popular', async (request,response)=>{
    try{
        const gamedata = await gameControl.getPopularGame()
        response.json(gamedata)
    }catch(err){
        response.send(err)
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
                            tempDict['genres'] = genres.name;
                            tempDict['gameList'] = r;
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
                            tempDict['genres'] = genres.name;
                            tempDict['gameList'] = r;
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
