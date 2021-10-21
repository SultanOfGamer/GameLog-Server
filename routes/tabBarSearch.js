
const express = require('express');
const router = express.Router();

const gameSearch = require('../controll/index').gameSearch

//search
//id, name, cover 전송
router.get('/', async (request,response)=>{
    const name = request.query.name;
    let sendObj = {};

    const gameName = await gameSearch.getSearchResult(name)
    const alterName = await gameSearch.getAlterSearch(name)
    const status = 200;
    sendObj = {status, gameName, alterName}
    response.status(200).json(sendObj)
})

module.exports = router;
