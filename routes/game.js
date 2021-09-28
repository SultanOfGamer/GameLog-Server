const express = require('express');
const router = express.Router();

const userControl = require('../controll/index').users
const userGameControl = require('../controll/index').userGames;


function checkInArrayString(arr, val) { //domain check value
    return arr.some(arrVal => val === arrVal);
}

//Library & Wishlist
router.get('/:tapbar/get', async (request,response)=>{
    const tabBar = request.params.tapbar;

    const sort = {}; // sort send value
    const sortDomain = ['aggregated_rating', 'first_release_date', 'gameName', 'createdTime'] //{별점순, 출시일 순, abc순, 담은 순}
    const sortTypeAsc = ['asc', 'desc'] // {asc, desc} 오름차순 내림차순

    const sortReqType = request.query.sorttype;
    const sortReq = request.query.sort

    if(sortReqType === sortTypeAsc[0]) sort[sortReq] = 1; //오름차순
    else if(sortReqType === sortTypeAsc[1]) sort[sortReq] = -1; //내림차순
    else if(sortReqType === undefined) sort['createdTime'] = -1 //default sort값

    //domain에 있는 sort값이 아닐 때 예외처리
    if(sortTypeAsc.includes(sortReqType) === false || checkInArrayString(sortDomain, sortReq) === false)
        response.json({message:'err in sort type'})

    if(userControl.isUser(request,response)) {
        let page = request.query.page - 1 // pagination
        try{
            switch (tabBar){
                case 'library': // user library 전송
                    const userLibraryList = await userGameControl.getUserGames(request.user, page, sort)
                    response.json({
                        message:'success response',
                        data:userLibraryList
                    })
                    break;
                case 'wishlist': //user wishlist 전송
                    const wishlistData = await userGameControl.getUserWishGames(request.user, request.body, page, sort)
                    response.json({
                        message:'success response',
                        data:wishlistData
                    })
                    break;
                default:
                    response.json({message:'라우팅 확인!'})
            }
        }catch(err){
            response.json({message:err})
        }
    }else{
        response.json({message:'please login!'})
    }
})


router.post('/:tapbar/insert', (request,response)=>{
    const tabBar = request.params.tapbar;
    if(userControl.isUser(request,response)) {
        userGameControl.insertUserGames(request.user, request.body, tabBar)
            .then(()=>{
                return response.json({message:'insert success'})
            }).catch((err)=>{
            return response.json({message:'insert fail', err:err})
        })
    }else{
        response.json({message:'please login!'})
    }
})

//user library 데이터 업데이트
// 해당하는 user, id를 찾아서 데이터 변경
// body -> 게임 id(number), 게임평가(number), 게임 평가(text), 게임 메모(text), 게임 status
// body -> gameId, userGameEval, userGameEvalText, userGameMemo, userGameStatus 필요
router.post('/:tapbar/update', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        const sendMessage = await userGameControl.updateUserGames(request.user, request.body)
            .catch((err)=> {
                return response.json({message: 'update fail', err: err})
            })
        response.json(sendMessage)
    }else{
        response.json({message:'please login!'})
    }
})

//user library 데이터 삭제
//삭제하는 id 전송후 삭제
// null, 빈칸 입력 혹은 유저가 삭제했을 시
router.post('/:tapbar/delete', async (request,response)=>{
    if(userControl.isUser(request,response)) {
        const sendMessage = await userGameControl.deleteUserGames(request.body)
        response.json(sendMessage)
    }else{
        response.json({message:'please login!'})
    }
})

module.exports = router;
