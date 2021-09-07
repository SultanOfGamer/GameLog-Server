
const getDate = require('../util/index').date;


module.exports = {
    getUserGames:function(user, model){
        return new Promise(function(resolve){
            model.find({userNickname:user.nickname})
                .limit(10)
                .then(data=>{
                    resolve(data)
                })
        })
    },
    addUserGames:function(user, model){
        model.insertMany({
            id:0,
            userEmail:user.email,
            userNickname:user.nickname,
            wishTime:getDate(),

            gameId:20479,
            gameName:'Rocket Riot',
            aggregated_rating:100,
            first_release_date:1245196800,

            userGameEval:4,
            userGameEvalText:'this is got game',
            userGameMemo:'so hard game',
            userGameStatus:'todo',

            createdTime:getDate()
        })
    },
    updateUserGames:function(user){

    },
    deleteUserGames:function(board_id){

    },
    getUserWishGames:function(user){

    }
}