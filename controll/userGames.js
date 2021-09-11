
const getDate = require('../util/index').date;

const gameList = require('../models/index').getGameList
const userGameModel = require('../models/index').getUserGames;

module.exports = {
    getUserGames:function(user, offset){ //get user 별 library 데이터 베이스
        const pageCount = 30;
        return new Promise(function(resolve, reject){
            userGameModel.find({userNickname:user.nickname})
                .limit(pageCount)
                .skip(offset * pageCount)
                .then(data=>{
                    resolve(data)
                })
        })
    },
    insertUserGames:function(user, body){ // add user 별 library 데이터 추가
        let tempGame = new Promise(function(resolve, reject){
            gameList.find({id:body.gameId})
                .limit(1)
                .then(data=>{
                    resolve(data)
                    // console.log(data)
                })
        })
        tempGame.then(data=>{
            const tempGame = data[0]

            userGameModel.create({
                userEmail: user.email,
                userNickname: user.nickname,

                // game list 에서 받아온 game 정보 저장
                gameId: tempGame.id,
                gameName: tempGame.name,
                aggregated_rating: tempGame.aggregated_rating,
                aggregated_rating_count: tempGame.aggregated_rating_count,
                first_release_date: tempGame.first_release_date,

                //유저측, 전송되는 데이터, request body로 받을 것
                userGameEval: body.userGameEval,
                userGameEvalText: body.userGameEvalText,
                userGameMemo: body.userGameMemo,
                userGameStatus: body.userGameStatus,
                //정보가 저장된 시점
                createdTime: getDate()
            }).then(r =>{
                return r
            })
                .catch((err)=>{
                    // console.log(err)
                    return err
                })
        })
    },
    updateUserGames:function(user, body){
        return userGameModel.findOneAndUpdate(
            {id:body.id},
            {
                    userGameEval: body.userGameEval,
                    userGameEvalText: body.userGameEvalText,
                    userGameMemo: body.userGameMemo,
                    userGameStatus: body.userGameStatus,
                    updatedTime:getDate()
                },{new:true},
            (err, game)=>{
                if(err) return err
            }
        ).catch((err)=>{console.log(err)})
    },
    deleteUserGames:function(body){
        return userGameModel.deleteOne({id:body.id}, function(err, result){
            if(err){return err}
            else return result
        })
    },

    //wishlist 전용 Controller
    getUserWishGames:function(user, body, page){
        const pageCount = 30;
        return new Promise(function(resolve, reject){
            userGameModel.find({userNickname:user.nickname, userGameStatus:'wish'})
                .limit(pageCount)
                .skip(page * pageCount)
                .then(data=>{
                    resolve(data)
                })
        })
    }
}