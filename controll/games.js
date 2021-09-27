
const gameGenresDB = require('../models/index').getGenres
const gameThemesDB = require('../models/index').getThemes
const gameGameList = require('../models/index').getGameList

module.exports = {
    getGame:function(genres){// 로그인 X 유명 장르를 통하여 게임 받아오기
        return new Promise(function(resolve){
            gameGameList.find({genres:{$elemMatch:{name:genres}}}, {id:1,name:1, cover:1}).select({_id:0})
            .where('aggregated_rating').gte(4)
            .where('aggregated_rating_count').gt(5)
            .sort('aggregated_rating')
            .limit(10)
            .then(data=>{
                resolve(data)
            })
        })
    },
    getGameQuery:function(genres){ //user genres 속 데이터 받아오기
        return new Promise(function(resolve){
            gameGameList.find({genres:{$elemMatch:{name:genres}}}, {id:1,name:1, cover:1}).select({_id:0})
            .limit(5)
            .then(data=>{
                resolve(data)
            })
        })
    },
    getCategory:function(type, offset = 0){ // 테마, 장르 보내기, 각 별로 게임 불러오기
        let response;
        const showCount = 5;
        switch(type){
            case 'genres':
                response = gameGenresDB.find()
                    .limit(5)
                    .skip(offset * showCount)
                    .then(data=>{
                        return data
                    })
                break
            case 'themes':
                response = gameThemesDB.find()
                    .limit(5)
                    .skip(offset * showCount)
                    .then(data=>{
                        return data
                    })
                break
        }
        return response
    },
    getPopularGame:function(){
        //TODO 두개의 sort 를 사용하는 방법 고안
        return new Promise(function(resolve){
            gameGameList.find({},{id:1,name:1, cover:1}).select({_id:0})
            .where('aggregated_rating').gte(4)
            .where('aggregated_rating_count').gt(4)
            .sort({aggregated_rating:1, aggregated_rating_count:1})
                // .sort('aggregated_rating_count')
            .limit(10)
            .then(data=>{
                resolve(data)
            })
        })
    }
}