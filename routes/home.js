const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/index').users
const gameGenresDB = require('../models/index').gameGenres
const usersDB = require('../models/index').userDatabase


router.get('/', (request,response)=>{
    if(userControl.isUser(request,response)){ // 로그인 세션 성공시에
        gameGenresDB.getGameGenresDB.find({}, function(err, game){
            if(game){
                response.json(game)
            }else{
                response.send('gameGenres load fail')
            }
        })
    }else{
        response.send('say Hello GameLog Application')
    }
})

module.exports = router;
