const gameCategory = {
    0: "main_game",
    1: "dlc_addon",
    2: "expansion",
    3: "bundle",
    4: "standalone_expansion",
    5: "mod",
    6: "episode",
    7: "season",
    8: "remake"	,
    9: "remaster"	,
    10: "expanded_game",
    11: "port",
    12: "fork"
}
const gameStatus = {
    0: "released",
    2: "alpha",
    3: "beta",
    4: "early_access",
    5: "offline",
    6: "cancelled",
    7: "rumored"
}

const gamePlatformsCategory = {
    1: "console",
    2: "arcade",
    3: "platform",
    4: "operating_system",
    5: "portable_console",
    6: "computer"
}



const mongoose = require('./initDB')

const imageSchema = new mongoose.Schema({
    id:{type:String},
    game:{type:String},
    height:{type:Number},
    width:{type:Number},
    url:{type:String},
    image_id:{type:String}
})

const gameSchema = new mongoose.Schema({
    id:{type:String, unique: true, index:true, sparse:true},
    name:{type:String},
    slug:{type:String},

    aggregated_rating:{type:Number},        //기관평가 점수
    aggregated_rating_count:{type:Number},  //기관 평가 숫자
    alternative_names:[{type:String}],         //검색시에 사용되는 대안 이름
    involved_companies:[{type:String}],

    first_release_date:{type:String},       // 첫 배포 날짜 UNIX time
    created_at:{type:Number},               // create 날짜
    updated_at:{type:Number},               //업데이트 날짜
    release_dates:[{type:Number}],

    category:{type:String},                 //게임 카테고리 in file gameCategory 참조
    status:{type:String},                   //게임 상태 in file gameStatus 참조

    game_modes:[{type:String}],               //gameGameModes 참조
    genres:[{type:String}],                   //gamegenres 참조 게임 장르 Ex) Puzzle, Shooter
    platforms:[{type:String}],                //gamePlatforms 참조
    themes:[{type:String}],                   //gameThemes 참조

    storyline:{type:String},                // 게임 스토리 짧은 설명
    summary:{type:String},                  //게임의 description

    cover:[imageSchema],                    //게임의 cover 이미지 API cover 사용
    screenshots:[imageSchema],              //게임 스크린샷, API screenshots 사용

})

const axios = require('axios')
const gameGameList = mongoose.model('game_gameList', gameSchema);

const IGDBconfig = require('../config/IGDBconfig.json')

const gameGetImage = require('./index').gameGetImage

const modelIndex = require('./index')

// 사용자 별 추천 DB 전송

//genres 별 게임 전송

//init = Themes 로 해야할지 genres로 해야할지 고민
//선호별 genres 5개 안에 게임 10개씩 담아서 rating 내림차순으로 전송

//데이터 가져오는 것은 것은 것은것은 mongodb default, 없는 값은 IGDB로 새로 전송 해서 받아오는 로직을 짜야하는데 어케하지

function initGameList(){
    const attribute = 'fields *, platforms.name, platforms.category, game_modes, genres ;'
    const condition = 'where aggregated_rating > 70 & aggregated_rating_count > 5; '
    const sort = 'sort aggregated_rating desc; '
    const limitCount = 'limit 5;'

    const gameList = getGameListIGDB(attribute, condition, sort, limitCount);
    // gameList.findOne({id:'26758'}, (err, data)=>{
    //     console.log(data)
    // })
    // getGameListMongo(gameGameList, 26578)
    // return gameList;
    // getGameListMongo(gameGameList)
}

function trasnferGameList(){

}

function userGameListRecommnad(user, themes){ //유저별 추천 return 값
    // const attribute = 'fields *;'
    // const condition = 'where aggregated_rating > 70 & aggregated_rating_count > 5; '
    // const sort = 'sort aggregated_rating desc; '
    // const limitCount = 'limit 10;'
    // gameList.findOne({id'26758'}, (err, data)=>{
    //
    // })
    const result = getGameListIGDB(attribute, condition, sort, limitCount
    ).then(result=>{
        return result
    }).catch(err=>{return err})
    return result;
}

function getSaveOptions(model, array, instance, type=''){
    let temp =  array.map(data=>{
        return model.find({id:data}, {_id:0, name:1})
            .then(data=>{
                instance = data[0].name
                return data[0].name
            })
    })
    return temp
}


//TODO
//mongodb 에서 불러오는 get 또한 작성, 로직 생각
//get함수 따로 작성
//save로 이름 변경,
function getGameListIGDB(attribute, condition='', sort='',
                         limitCount=''){
    const response = axios({
        url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
            'Accept': IGDBconfig.IGDB.Accept,
            'Client-ID': IGDBconfig.IGDB.Client_ID,
            'Authorization': IGDBconfig.IGDB.Authorization,
        },
        data: attribute + condition + sort + limitCount
    })
        .then(response => {
            const resultData = response.data;
            resultData.forEach((i,index)=>{
                setTimeout(() => {},index * 1000);
                const gameGameInstance = new gameGameList(i);
                gameGameInstance.category = gameCategory[i.category]
                gameGameInstance.status = gameStatus[i.status]
                // platforms 은 따로

                //TODO REFACTORING!!!!!!!!!!!!
                //game mode 저장
                i.game_modes.forEach((data,index)=>{
                    modelIndex.getGameModes.find({id:data}, {_id:0, name:1})
                        .then(resultData=>{
                            i.game_modes[index] = resultData[0].name
                        })
                })
                //game Genres 저장
                i.genres.forEach((data, index)=>{
                    modelIndex.getGenres.find({id:data}, {_id:0, name:1})
                        .then(resultData=>{
                            i.genres[index] = resultData[0].name
                        })
                })

                //game Themes 저장
                i.themes.forEach((data, index)=>{
                    modelIndex.getThemes.find({id:data}, {_id:0, name:1})
                        .then(resultData=>{
                            i.themes[index] = resultData[0].name
                        })
                })
                //platforms의 category string category로 분리, 저장
                i.platforms.forEach((data, index)=>{
                    data.category = gamePlatformsCategory[data.category]
                })
                console.log(i)
                gameGetImage('covers', 'fields *;',
                    'where game = '+i.id+';','','',index)
                    .then(result=>{
                        gameGameInstance.cover = result
                        // return result
                    }).then(()=>{
                    gameGetImage('screenshots', 'fields *; ',
                        'where game = '+i.id+';', '','',index)
                        .then(result=>{
                            gameGameInstance.screenshots = result
                            // return result;
                        }).then(()=>{
                        gameGameInstance.save((err)=>{
                            // console.log(err)
                            if(err) return 'err'
                            else return 'save'
                        })
                    })
                });
            })
            return response.data;
        })
        .catch(err => {
            console.error(err);
        });
    return gameGameList
}

function postGameList(){

}

module.exports = {
    initGameList:initGameList(),
    gameModel:gameGameList
}
