const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/index').users
const gameControl = require('../controll/index').games;

const gameGenresDB = require('../models/index').getGenres
const gameGameList = require('../models/index').gameDB

// const usersDB = require('../models/index').userDatabase


router.get('/', (request,response)=>{
    if(userControl.isUser(request,response)){ // 로그인 세션 성공시에 회원별 데이터 전송
        gameGenresDB.find({}, function(err, game){
            if(game){
                response.json(game)
            }else{
                response.send('gameGenres load fail')
            }
        })
    }else{ //로그인 X, 첫 페이지 데이터 전송
        gameControl.getGame(gameGameList.gameModel)
            .then(data=>{
                response.json(data)
            })
    }
})

module.exports = router;
