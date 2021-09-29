
const getDate = require('../util/index').date;

const gameList = require('../models/index').getGameList
const userGameModel = require('../models/index').getUserGames;

module.exports = {
    getUserGames:function(user, offset, sortType){ //get user 별 library 데이터 베이스
        const pageCount = 30;
        return new Promise(function(resolve, reject){
            userGameModel.find({userid:user.id, userGameStatus:{$ne:'wish'}},
                {id:1, gameId:1, gameName:1, cover:1, userGameStatus:1}) //wish 제외 get
                .select({_id:0})
                .limit(pageCount)
                .skip(offset * pageCount)
                .sort(sortType)
                .then(data=>{
                    resolve(data)
                }).catch(err=>{
                    reject(err)
                })
        })
    },
    //wishlist 전용 Controller
    getUserWishGames:function(user, body, page, sortType){
        const pageCount = 30;
        return new Promise(function(resolve, reject){
            userGameModel.find({userid:user.id, userGameStatus:'wish'},
                {id:1, gameId:1, gameName:1, cover:1, userGameStatus:1})
                .select({_id:0})
                .limit(pageCount)
                .skip(page * pageCount)
                .sort(sortType)
                .then(data=>{
                    resolve(data)
                }).catch(err=>{
                    reject(err)
            })
        })
    },
    insertUserGames:function(user, body, tabBar){
        let wishTime = undefined;
        if (tabBar === 'wishlist') wishTime = getDate.getDateUNIX() // library일 시 wish time 생성 x

        return new Promise(function(resolve, reject){
            gameList.find({id:body.gameId})
                .limit(1)
                .exec(function(err, data){
                    if(err) reject(err)
                    const tempGame = data[0]
                    userGameModel.create({
                        userid:user.id,
                        // game list 에서 받아온 game 정보 저장
                        gameId: tempGame.id,
                        gameName: tempGame.name,
                        cover: {
                            id:tempGame.cover[0].id,
                            game:tempGame.id,
                            height:tempGame.cover[0].height,
                            width:tempGame.cover[0].width,
                            url:tempGame.cover[0].url
                        },
                        aggregated_rating: tempGame.aggregated_rating,
                        aggregated_rating_count: tempGame.aggregated_rating_count,
                        first_release_date: tempGame.first_release_date,

                        //유저측, 전송되는 데이터, request body로 받을 것
                        userGameRating: body.userGameRating,
                        // userGameEvalText: body.userGameEvalText,
                        userGameMemo: body.userGameMemo,
                        userGameStatus: body.userGameStatus,
                        //정보가 저장된 시점
                        createdTime: getDate.getDateUNIX(),
                        wishTime: wishTime
                    }, function (err, game) {
                        if (err) reject(err)
                        resolve(game)
                    })
                })
        })
    },
    updateUserGames:function(user, body){
        return new Promise((resolve, reject) => {
            userGameModel.findOneAndUpdate(
                {id:body.id},
                {
                    userGameRating: body.userGameRating,
                    // userGameEvalText: body.userGameEvalText,
                    userGameMemo: body.userGameMemo,
                    userGameStatus: body.userGameStatus,
                    updatedTime:getDate.getDateUNIX()
                },{new:true},
                (err, game)=>{
                    if(err) reject(err)
                    if(!game) resolve({message:'update fail not exist data'})
                    resolve({message:'update success!'})
                }
            )
        })
    },
    deleteUserGames:function(body){
        return new Promise((resolve, reject) => {
            userGameModel.deleteOne({id:body.id}, function(err, result){
                if(err) reject({message:'delete fail', err:err})
                if(result.deletedCount == 0) resolve({message: 'delete fail'})
                resolve({message: 'delete success'})
            })
        })
    }
}