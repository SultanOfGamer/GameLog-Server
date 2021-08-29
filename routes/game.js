const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/user')
const gameGenresDB = require('../models/gameGenresDB')


router.get('/', (request,response)=>{
    response.send('this is game')
})

module.exports = router;
