
const gameGenresDB = require('../models/index').getGenres
const gameThemesDB = require('../models/index').getThemes
const gameGameList = require('../models/index').getGameList

const userGame = require('../models/index').getUserGames

function checkSelectedGame(user, gameId){ // user가 갖고있는 정보의 game인지
    return new Promise(function (resolve, reject){
        userGame.findOne({userid:user.id, gameId:gameId})
            .select({_id:0})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
    })
}

async function getSelectedGame(gameId){ // 선택된 게임의 detail 정보
    return new Promise(function(resolve, reject){
        gameGameList.findOne({id:gameId})
            .select({_id:0})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
    })
}

module.exports = {
    getGame:function(genres){// 로그인 X 유명 장르를 통하여 게임 받아오기
        return new Promise(function(resolve){
            gameGameList.find({genres:{$elemMatch:{name:genres}}}, {id:1,name:1, cover:1})
                .select({_id:0})
            .where('aggregated_rating').gte(4)
            .where('aggregated_rating_count').gt(5)
            .sort({'aggregated_rating_count':-1, 'aggregated_rating':-1})
            .limit(10)
            .then(data=>{
                resolve(data)
            })
        })
    },
    getGameQuery:function(genres){ //user genres 속 데이터 받아오기
        return new Promise(function(resolve){
            gameGameList.find({genres:{$elemMatch:{name:genres}}}, {id:1,name:1, cover:1})
                .select({_id:0})
            .limit(5)
            .then(data=>{
                resolve(data)
            })
        })
    },
    getCategory:function(type, offset = 0, showNumArg = 5){ // 테마, 장르 보내기, 각 별로 게임 불러오기
        let response; // return 값
        const showCount = showNumArg; // 보여주는 수
        const skipNum = offset * showCount; // skip 하는 데이터 개수 조절
        switch(type){
            case 'genres':
                response = gameGenresDB.find()
                    .select({_id:0})
                    .limit(showCount)
                    .skip(skipNum)
                    .then(data=>{
                        return data
                    })
                break
            case 'themes':
                response = gameThemesDB.find()
                    .select({_id:0})
                    .limit(showCount)
                    .skip(skipNum)
                    .then(data=>{
                        return data
                    })
                break
            default:
                return 'err'
                break
        }
        return response
    },
    getPopularGame:function(){
        return new Promise(function(resolve){
            gameGameList.find({},{id:1,name:1, cover:1})
                .select({_id:0})
            .where('aggregated_rating').gte(4)
            .where('aggregated_rating_count').gt(20)
            .sort({'aggregated_rating_count':-1, 'aggregated_rating':-1})
            .limit(10)
            .then(data=>{
                resolve(data)
            })
        })
    },
    getSelectedGame:getSelectedGame,
    checkSelectedGame:checkSelectedGame,
}