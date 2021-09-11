const mongoose = require('./initDB')

const userGamesSchema = new mongoose.Schema({
    id:{type:String, unique: true, index:true, required:true}, // Database id
    userEmail:{type:String},        //작성 user email
    userNickname:{type:String},     //작성 user nickname
    wishTime:String,                 //wishlist 담은 날짜

    // Client 측에서 game 정보 전송
    gameId:{type:Number},           //gameId, gameList의 id값
    gameName:{type:String},         //game Name
    aggregated_rating:{type:String},//IGDB 기관 평가
    first_release_date:{type:String},//첫배포 날짜

    userGameEval:{type:Number},     //게임 평점 5점만점
    userGameEvalText:{type:String}, //게임 평가 Text
    userGameMemo:{type:String},     //게임 메모
    userGameStatus:{type:String},   //게임 상태 {wish, todo, doing, done}

    createdTime:String,             //생성 날짜 게임을 담은 날짜
    updatedTime:String,             //update 날짜
})

const userGames = mongoose.model('users_library', userGamesSchema);


module.exports = {
    getUserGames:userGames
};