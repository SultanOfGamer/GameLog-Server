const express = require('express');
const router = express.Router();
const logger = require('../config/wiston');

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;

router.use((request, response, next) => {
    if(!(userControl.isUser(request, response))){
        logger.error('로그인 필요')
        return response.status(401).send({
            status:401,
            message:'로그인이 필요합니다.'
        })
    }
    next();
})

router.delete('/user/reset', async (request, response) => {
    // try{
    const resetCount = await userGameControl.resetUserGames(request.user)
    response.status(200).send({
        status:200,
        deletedCount:resetCount.deletedCount,
        message:'userGame Reset'
    })
})

//Library & Wishlist
router.get('/:tapbar', async (request,response,next)=>{

    const tabBar = request.params.tapbar;
    if(tabBar !== "library" && tabBar !== "wishlist")
        next("잘못된 Tabbar 입니다.")
    const sortObj = {}; // sort send value
    const sortDomain = ['aggregated_rating', 'first_release_date', 'gameName', 'createdTime'] //{별점순, 출시일 순, abc순, 담은 순}
    const sortTypeAsc = ['asc', 'desc'] // {asc, desc} 오름차순 내림차순

    const {sort, sorttype} = request.query;

    if(sorttype === sortTypeAsc[0]) sortObj[sort] = 1; //오름차순
    else if(sorttype === sortTypeAsc[1]) sortObj[sort] = -1; //내림차순
    else if(sorttype === undefined) sortObj['createdTime'] = -1 //default sort값

    //domain에 있는 sort값이 아닐 때 예외처리
    if(sortTypeAsc.includes(sorttype) === false || sortDomain.includes(sort) === false)
        if(sorttype !== undefined || sort !== undefined) //default 예외처리
            return response.status(400).json({
                status:400,
                message:'sort type bad request'
            })
    let page = request.query.page - 1 // pagination
    if(!request.query.page) page = 0;
    try{
        switch (tabBar){
            case 'library': // user library 전송
                const userLibraryList = await userGameControl.getUserGames(request.user, page, sortObj)
                return response.status(200).json({
                    status:200,
                    message:'success response',
                    user:{
                        id:request.user.id,
                        email:request.user.email
                    },
                    data:userLibraryList
                })
                break;
            case 'wishlist': //user wishlist 전송
                const wishlistData = await userGameControl.getUserWishGames(request.user, request.body, page, sortObj)
                return response.status(200).json({
                    status:200,
                    message:'success response',
                    user:{
                        id:request.user.id,
                        email:request.user.email
                    },
                    data:wishlistData
                })
                break;
            default:
                next()
                break;
        }
    }catch(err){
        next(err)
    }
})

//Library & Wishlist insert
router.post('/:tapbar', async (request,response, next)=>{
    const tabBar = request.params.tapbar;
    if(tabBar !== "library" && tabBar !== "wishlist")
        next("잘못된 Tabbar 입니다.")
    try{
        const data = await userGameControl.insertUserGames(request.user, request.body, tabBar)
        return response.status(201).json({
            status:201,
            message:'insert success',
            data:data
        })
    }catch (err){
        return response.status(500).json({
            status:500,
            message:'insert fail',
            err:err
        })
    }
})


// Library & Wishlist 다른유저 데이터 방지
router.use(async (request, response, next)=>{
    try{
        if(!request.body.id)
            throw `잘못된 접근, body ${request.body.id}`
        const userid = await userGameControl.valUserGames(request.body)
        if(!userid) {
            next('존재하지 않는 id 입니다.')
        }
        else if(userid !== request.user.id){
            logger.error('타유저 데이터 접근')
            response.status(403).send({
                status:403,
                message:'Invalid user game'
            })
        }else{
            next()
        }
    }catch(err){
        next(err)
    }
})

//user library 데이터 업데이트
// 해당하는 user, id를 찾아서 데이터 변경
// body -> 게임 id(number), 게임평가(number), 게임 평가(text), 게임 메모(text), 게임 status
// body -> gameId, userGameEval, userGameEvalText, userGameMemo, userGameStatus 필요
router.put('/:tapbar', async (request,response, next)=>{
    const tabBar = request.params.tapbar;
    if(tabBar !== "library" && tabBar !== "wishlist")
        next("잘못된 Tabbar 입니다.")
    const {status, message, data} = await userGameControl.updateUserGames(request.user, request.body)
        .catch((err)=> {
            next(err)
        })
    return response.status(status).json({
        status,
        message,
        data
    })
})

//user library 데이터 삭제
//삭제하는 id 전송후 삭제
// null, 빈칸 입력 혹은 유저가 삭제했을 시
router.delete('/:tapbar', async (request,response, next)=>{
    const tabBar = request.params.tapbar;
    if(tabBar !== "library" && tabBar !== "wishlist")
        next("잘못된 Tabbar 입니다.")
    const {status, message, data} = await userGameControl.deleteUserGames(request.body)
    response.json({
        status,
        message,
        data
    })
})

module.exports = router;
