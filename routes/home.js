const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/index').users
const gameControl = require('../controll/index').games;

const gameGenresDB = require('../models/index').getGenres
const gameThemesDB = require('../models/index').getThemes
const gameGameList = require('../models/index').getGameList

// const usersDB = require('../models/index').userDatabase



router.get('/', async (request,response)=>{
    if(userControl.isUser(request,response)){ // 로그인 세션 성공시에 회원별 데이터 전송
        let responseDict = [];
        try{
            //genresData를 user genres로 편의성 맞게 변경
            const genresData = await gameControl.getCategory('genres', gameGenresDB)

            const tempPromise = genresData.map(async function(genres){
                return new Promise(function(resolve){
                    gameControl.getGameQuery(gameGameList, genres.name)
                        .then(r=>{
                            let tempDict = {};
                            tempDict[genres.name] = r
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
        gameControl.getGame(gameGameList)
            .then(data=>{
                response.json(data)
            })
    }
})

module.exports = router;
