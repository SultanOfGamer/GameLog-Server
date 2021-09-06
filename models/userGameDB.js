const mongoose = require('./initDB')

const userGamesSchema = new mongoose.Schema({
    id:{type:String, unique: true}, // Database id
    userEmail:{type:String},        //작성 user email
    userNickname:{type:String},     //작성 user nickname
    gameId:{type:Number},           //gameId, gameList의 id값

    aggregated_rating:{type:String},//IGDB 기관 평가

    userGameEval:{type:String},     //게임 평점 5점만점
    userGameEvalText:{type:String}, //게임 평가 Text
    userGameMemo:{type:String},     //게임 메모
    userGameStatus:{type:String},   //게임 상태 {wish, todo, doing, done}

    createdTime:String,             //생성 날짜
    updatedTime:String,             //update 날짜
})

const userGames = mongoose.model('users_library', userGamesSchema);


module.exports = {
    getUserGames:userGames
};