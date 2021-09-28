
const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const gameSearch = require('../controll/index').gameSearch

const gameList = require('../models/index').getGameList;

//search
//id, name, cover 사진 전송
router.get('/', async (request,response)=>{
    const gameName = request.query.name;
    let send = {};

    gameSearch.getSearchResult(gameName)
        .then(data=>{
            send['game'] = data
            gameSearch.getAlterSearch(gameName)
                .then(dataAlter=>{
                    send['game'] = dataAlter
                    response.json(send)
                })
        })
})



//
// router.get('/autotest',async (request, response)=>{
//     try{
//         let result = await gameList.aggregate([
//             {
//                 "$text":{
//                     "autocomplete":{
//                         "query":`${request.query.query}`,
//                         "path":"name",
//                         "fuzzy":{
//                             "maxEdits":2,
//                             "prefixLength":3
//                         }
//                     }
//                 }
//             }
//         ]).toArray();
//         response.send(result);
//     }catch(err){
//          response.status(500).send({ message: e.message });
//     }
//     //출처 : https://www.mongodb.com/developer/how-to/building-autocomplete-form-element-atlas-search-javascript/
// })

module.exports = router;
