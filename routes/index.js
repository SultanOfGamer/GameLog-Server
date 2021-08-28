const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (request,response)=>{
    if(request.user){
        response.send('user email:' + request.user.email)
    }else{
        response.send('say Hello GameLog Application')
    }
})

module.exports = router;
