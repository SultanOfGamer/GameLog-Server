const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


//duplicated code


router.get('/', (request,response)=>{
    response.send('this is game')
})

module.exports = router;
