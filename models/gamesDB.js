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


const mongoose = require('./initDB')

const gameSchema = new mongoose.Schema({
    id:{type:String, unique: true},
    name:{type:String, unique: true},
    slug:{type:String},

    aggregated_rating:{type:String},        //기관평가 점수
    aggregated_rating_count:{type:String},  //기관 평가 숫자
    alternative_name:{type:String},         //검색시에 사용되는 대안 이름

    first_release_date:{type:Number},       // 첫 배포 날짜 UNIX time
    created_at:{type:Number},               // create 날짜
    updated_at:{type:Number},               //업데이트 날짜
    release_dates:{type:Number},

    category:{type:String},                 //게임 카테고리 in file gameCategory 참조
    status:{type:String},                   //게임 상태 in file gameStatus 참조

    game_modes:{type:String},               //gameGameModes 참조
    genres:{Type:String},                   //gamegenres 참조 게임 장르 Ex) Puzzle, Shooter
    platforms:{type:String},                //gamePlatforms 참조
    themes:{type:String},                   //gameThemes 참조

    storyline:{type:String},                // 게임 스토리 짧은 설명
    summary:{type:String},                  //게임의 description

    cover:{type:String},                    //게임의 cover 이미지 API cover 사용
    screenshots:{type:String},              //게임 스크린샷, API screenshots 사용

})

const axios = require('axios')
const gameGameList = mongoose.model('game_game', gameSchema);

const IGDBconfig = require('../config/IGDBconfig.json')

// 있는 게임일 경우 mongo db로 없는 게임일 경우 API에 받아와서 저장 -> name을 통하여 구분분


//game은 전체다 불러올 필요 x 필요한 것만 받아서 전송
// init 첫 페이지

// 사용자 별 추천 DB 전송

//genres 별 게임 전송

//init = THemes 로 해야할지 genres로 해야할지 고민
// 선호별 genres 5개 안에 게임 20개씩 담아서 rating 내림차순으로 전송
function initGameList(){
    const result = getGameList('fields name, aggregated_rating, aggregated_rating_count; ',
        'where aggregated_rating > 70 & aggregated_rating_count > 5; ',
        'sort aggregated_rating desc;',
        'limit 30;'
    ).then(result=>{
        return result
    }).catch(err=>{return err})
    return result
}

async function getGameList(attribute, condition='', sort='',
                           limitCount=''){
    const response = await axios({
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
            return response.data;
        })
        .catch(err => {
            console.error(err);
        });
    return response
}
// getGameList('fields name, aggregated_rating;',
//     'where aggregated_rating > 10;',
//     'sort aggregated_rating desc;',
//     'limit 30;'
// )

getGameList('fields name; ',
    'where name = "S"* ; ',
    '',
    'limit 30;'
).then(result=>{
    // console.log(result)
})

function postGameList(){

}
module.exports = {
    initGameList:initGameList()
}
