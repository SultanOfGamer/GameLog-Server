//
// 처음 보내줘야할 genres, themes 데이터

//home과 user 회원 가입시에 등록하는 선호 분야 라우팅 파일 분리

//Tab 별로 rotuer은 TAB 으로 구별
const express = require('express');
const router = express.Router();

const gameControll = require('../controll/index').games;

router.get('/genres', async (request, response)=>{
    let sendObj;
    gameControll.getCategory('genres',0, 23)
        .then(data=>{
            sendObj = data
        })
        .then(()=>{
            // console.log(sendObj)
            response.status(200).json({
                status:200,
                message:'genres data',
                data:sendObj
            })
        })
})

router.get('/themes', async (request, response)=>{
    let sendObj;
    gameControll.getCategory('themes', 0, 22)
        .then(data=>{
            sendObj = data
        })
        .then(()=>{
            response.status(200).json({
                status:200,
                message:'themes',
                data:sendObj
            })
        })

})

module.exports = router