const express = require('express');
const app = express();
const router = express.Router();

const userControl = require('../controll/user')

router.get('/', (request,response)=>{
    if(userControl.isUser(request,response)){
        response.send('user email:' + request.user.email)
    }else{
        response.send('say Hello GameLog Application')
    }
})

module.exports = router;
