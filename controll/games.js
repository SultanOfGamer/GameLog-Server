
const gameGenresDB = require('../models/index').getGenres
const gameThemesDB = require('../models/index').getThemes
const gameGameList = require('../models/index').getGameList

module.exports = {
    getGame:function(genres){// init data
        return new Promise(function(resolve){
            gameGameList.find({genres:{$elemMatch:{name:genres}}})
            .where('aggregated_rating').gte(3)
            .where('aggregated_rating_count').gt(5)
            .sort('aggregated_rating')
            .limit(10)
            .then(data=>{
                resolve(data)
            })
        })
    },
    getGameQuery:function(genres){
        return new Promise(function(resolve){
            gameGameList.find({genres:{$elemMatch:{name:genres}}})
            .limit(5)
            .then(data=>{
                resolve(data)
            })
        })
    },
    getCategory:function(type){ // 테마, 장르 보내기, 각 별로 게임 불러오기
        let response;
        switch(type){
            case 'genres':
                response = gameGenresDB.find()
                    .limit(5)
                    .then(data=>{
                        return data
                    })
                break
            case 'themes':
                response = gameThemesDB.find()
                    .limit(5)
                    .then(data=>{
                        return data
                    })
                break
        }
        return response
    },
    getGenres:function(model){

    },
    updateGame: function (  ) {

    }
}