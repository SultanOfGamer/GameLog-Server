
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const gameSearch = require('../controll/index').gameSearch

const gameList = require('../models/index').getGameList;

//search
//id, name, cover 사진 전송
router.get('/', async (request,response)=>{
    const gameName = request.query.name;
    let sendObj = {};

    gameSearch.getSearchResult(gameName)
        .then(data=>{
            sendObj['game'] = data
            gameSearch.getAlterSearch(gameName)
                .then(dataAlter=>{
                    sendObj['game'] = dataAlter
                    response.json(sendObj)
                })
        })
})

module.exports = router;
