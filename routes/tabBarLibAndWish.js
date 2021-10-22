const express = require('express');
const router = express.Router();
const logger = require('../config/wiston');

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;

function checkInArrayString(arr, val) { //domain check value
    return arr.some(arrVal => val === arrVal);
}

router.use((request, response, next) => {
    if(!(userControl.isUser(request, response))){
        logger.error('로그인 필요')
        response.status(401).send({
            status:401,
            message:'로그인이 필요합니다.'
        })
    }
    next();
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
    else if(sorttype === undefined || sortObj === undefined) sortObj['createdTime'] = -1 //default sort값

    //domain에 있는 sort값이 아닐 때 예외처리
    if(sortTypeAsc.includes(sorttype) === false || checkInArrayString(sortDomain, sort) === false)
        if(sorttype !== undefined && sort !== undefined) //default 예외처리
            response.status(400).json({
                status:400,
                message:'sort type bad request'
            })

    let page = request.query.page - 1 // pagination
    try{
        switch (tabBar){
            case 'library': // user library 전송
                const userLibraryList = await userGameControl.getUserGames(request.user, page, sortObj)
                response.status(200).json({
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
                response.status(200).json({
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
        response.status(500).json({
            status:500,
            message:err
        })
    }
})

//Library & Wishlist insert
router.post('/:tapbar', (request,response, next)=>{
    const tabBar = request.params.tapbar;
    if(tabBar !== "library" && tabBar !== "wishlist")
        next("잘못된 Tabbar 입니다.")
    userGameControl.insertUserGames(request.user, request.body, tabBar)
        .then((data)=>{
            return response.status(201).json({
                status:201,
                message:'insert success',
                data:data
            })
        })
        .catch((err)=>{
            return response.status(500).json({
                status:500,
                message:'insert fail',
                err:err
            })
        })
})

router.delete('/:tabbar/reset', async (request, response, next) => {
    const tabBar = request.params.tapbar;
    if(tabBar !== "library" && tabBar !== "wishlist")
        next("잘못된 Tabbar 입니다.")
    const deletedCount = await userGameControl.resetUserGames(request.user)
    response.status(204).send({
        status:204,
        deletedCount,
        message:'userGame Delete'
    })
})
// Library & Wishlist 다른유저 데이터 방지
router.use(async (request, response, next)=>{
    const userid = await userGameControl.valUserGames(request.body)
    if(userid !== request.user.id){
        logger.error('타유저 데이터 접근')
        response.status(403).send({
            status:403,
            message:'올바른 user game이 아닙니다.'
        })
    }else{
        next()
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
            return response.status(500).json({
                status:500,
                message: 'update fail',
                err: err
            })
        })
    response.status(status).json({
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
