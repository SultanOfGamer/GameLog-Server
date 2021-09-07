
const getDate = require('../util/index').date;

const gameList = require('../models/index').getGameList
const userGameModel = require('../models/index').getUserGames;

module.exports = {
    getUserGames:function(user){
        return new Promise(function(resolve, reject){
            userGameModel.find({userNickname:user.nickname})
                .limit(10)
                .then(data=>{
                    resolve(data)
                })
        })
    },
    addUserGames:function(user, gameId){
        let tempGame = new Promise(function(resolve, reject){
            gameList.find({id:gameId})
                .limit(1)
                .then(data=>{
                    resolve(data)
                })
        })
        tempGame.then(data=>{
            userGameModel.insertMany({
                id:0,
                userEmail:user.email,
                userNickname:user.nickname,
                wishTime:getDate(),

                gameId:data.id,
                gameName:data.name,
                aggregated_rating:data.aggregated_rating,
                first_release_date:data.first_release_date,

                userGameEval:4,
                userGameEvalText:'this is got game',
                userGameMemo:'so hard game',
                userGameStatus:'todo',

                createdTime:getDate()
            })
        })

    },
    updateUserGames:function(user){

    },
    deleteUserGames:function(board_id){

    },
    getUserWishGames:function(user){

    }
}