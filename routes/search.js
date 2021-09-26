
const express = require('express');
const router = express.Router();

const gameSearch = require('../controll/index').gameSearch


router.get('/', (request,response)=>{
    gameSearch.getSearchResult("The", 1)
        .then(data=>{
            console.log(data)
        })
    // gameSearch.getAlterSearch("se", 0)
    //     .then(data=>{
    //         console.log(data)
    //     })
})

module.exports = router;
