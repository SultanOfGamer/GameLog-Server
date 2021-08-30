const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/index').users
const gameGenresDB = require('../models/index').gameGenres
const gameGameList = require('../models/index').gameDB

const usersDB = require('../models/index').userDatabase


router.get('/', (request,response)=>{
    if(userControl.isUser(request,response)){ // 로그인 세션 성공시에
        gameGenresDB.getGameGenresDB.find({}, function(err, game){
            if(game){
                response.json(game)

                // response.json(gameGameList.initGameList)
            }else{
                response.send('gameGenres load fail')
            }
        })
        // console.log(gameGameList.initGameList)
    }else{
        // response.send('say Hello GameLog Application')
        gameGameList.initGameList.then(result=>{
            response.json(result)
        })
    }
})

module.exports = router;
