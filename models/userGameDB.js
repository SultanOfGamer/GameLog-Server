const mongoose = require('./initDB')

const autoIncrementIndex = require('mongoose-sequence')(mongoose);

const imageSchema = new mongoose.Schema({
    id:{type:Number},
    game:{type:Number},
    height:{type:Number},
    width:{type:Number},
    url:{type:String},
})

const userGamesSchema = new mongoose.Schema({
    // id:{type:Number}, // Database id
    userid:{type:Number, required:true},

    // Client 측에서 game 정보 전송
    gameId:{type:Number, required:true},           //gameId, gameList의 id값
    gameName:{type:String, required:true},         //game Name
    cover:imageSchema,            //game cover image
    aggregated_rating:{type:Number},//IGDB 기관 평가
    aggregated_rating_count:{type:Number},//IGDB 기관 평가 count
    first_release_date:{type:Number},//첫배포 날짜

    userGameRating:{type:Number},     //게임 평점 5점만점
    // userGameEvalText:{type:String}, //게임 평가 Text
    userGameMemo:{type:String},     //게임 메모
    userGameStatus:{type:String},   //게임 상태 {wish, todo, doing, done}

    createdTime:Number,             //생성 날짜 게임을 담은 날짜
    updatedTime:Number,             //update 날짜
    wishTime:Number,                 //wishlist 담은 날짜
});
userGamesSchema.index({
    userid:1,
    gameId:1
},{unique:true})
userGamesSchema.plugin(autoIncrementIndex, {id:"gameUser_seq",inc_field:'id'});


const userGames = mongoose.model('users_library', userGamesSchema);


module.exports = {
    getUserGames:userGames
};