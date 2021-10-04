



//gameCategory, status str 변경 enum
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
// platforms category 변경 enum
const gamePlatformsCategory = {
    1: "console",
    2: "arcade",
    3: "platform",
    4: "operating_system",
    5: "portable_console",
    6: "computer"
}

const mongoose = require('./initDB')



//platform schema
const gamePlatformsSchema = new mongoose.Schema({
    id:{type:Number},
    category:{type:Number},
    category_name:{type:String},
    name:{type:String}
})

//genres, themes, game_modes, alter_names , involved_com in schema
const childrenSchema = new mongoose.Schema({
    id:{type:Number},
    name:{type:String}
})

// involved_company Schema
const involved_com = new mongoose.Schema({
    id:{type:Number},
    company:[childrenSchema]
})

const imageSchema = new mongoose.Schema({
    id:{type:Number},
    game:{type:Number},
    height:{type:Number},
    width:{type:Number},
    url:{type:String},
})

const gameSchema = new mongoose.Schema({
    id:{type:Number, index:true, sparse:true, unique:true},
    name:{type:String, required:true},
    slug:{type:String},

    aggregated_rating:{type:Number},        //기관평가 점수
    aggregated_rating_count:{type:Number},  //기관 평가 숫자
    alternative_names:[childrenSchema],         //검색시에 사용되는 대안 이름
    involved_companies:[involved_com],

    first_release_date:{type:Number},       // 첫 배포 날짜 UNIX time
    created_at:{type:Number},               // create 날짜
    updated_at:{type:Number},               //업데이트 날짜
    release_dates:[{type:Number}],

    category:{type:String},                 //게임 카테고리 in file gameCategory 참조
    status:{type:String},                   //게임 상태 in file gameStatus 참조

    game_modes:[childrenSchema],               //gameGameModes 참조
    genres:[childrenSchema],                   //gamegenres 참조 게임 장르 Ex) Puzzle, Shooter
    platforms:[gamePlatformsSchema],                //gamePlatforms 참조
    themes:[childrenSchema],                   //gameThemes 참조

    storyline:{type:String},                // 게임 스토리 짧은 설명
    summary:{type:String},                  //게임의 description

    cover:[imageSchema],                    //게임의 cover 이미지 API cover 사용
    screenshots:[imageSchema],              //게임 스크린샷, API screenshots 사용

})

const axios = require('axios')
const gameGameList = mongoose.model('game_gameList', gameSchema);

const IGDBconfig = require('../config/IGDBconfig.json')

// const transToKorea = require('../util/index').transToKorea;

// 사용자 별 추천 DB 전송
//genres 별 게임 전송
//데이터 가져오는 것은 것은 것은것은 mongodb default, 없는 값은 IGDB로 새로 전송 해서 받아오는 로직을 짜야하는데 어케하지

function initGameList(){
    //처음 받아오는 게임 리스트

}

async function initGameListSave(){ //IGDB to mongo db save function
    //field 쿼리문 작성
    const gameModes = 'game_modes.name, '
    const genres = 'genres.name, '
    const platforms = 'platforms.name, platforms.category,'
    const themes = 'themes.name, '

    const alter_names = 'alternative_names.name, '
    const involved_com = 'involved_companies.company.name, '
    const cover = 'cover.width, cover.height, cover.url, cover.game, '
    const screenshots = 'screenshots.width, screenshots.height, screenshots.url, screenshots.game '

    let sumStr = gameModes + genres + platforms + themes + alter_names + involved_com + cover + screenshots;

    const attribute = 'fields *, ' + sumStr + ';'
    let condition = 'where aggregated_rating > 80 & aggregated_rating_count > 5; '
    let sort = 'sort aggregated_rating desc; '
    const limitCount = 'limit 50; '

    let pos = 0;
    let offset = ' offset ' + pos  + ';';
    for (let i = 0; i < 10000; i++) {
        const gameList = await saveGameListIGDBToDB(attribute, condition, sort, limitCount, offset);
        offset = ' offset ' + pos  + ';';
        pos = pos + 1;
        console.log('first', pos)
        await new Promise(res=>setTimeout(res,1000))
    }

    condition = 'where aggregated_rating > 50 & aggregated_rating_count > 1; '
    sort = ''
    pos = 0;
    offset = ' offset ' + pos  + ';';
    for (let i = 0; i < 10000; i++) {
        const gameList = await saveGameListIGDBToDB(attribute, condition, sort, limitCount, offset);
        offset = ' offset ' + pos  + ';';
        pos = pos + 1;
        console.log('second', pos)
        await new Promise(res=>setTimeout(res,1000))
    }

    condition = ''
    sort = ''
    pos = 0;
    offset = ' offset ' + pos  + ';';
    for (let i = 0; i < 10000; i++) {
        const gameList = await saveGameListIGDBToDB(attribute, condition, sort, limitCount, offset);
        offset = ' offset ' + pos  + ';';
        pos = pos + 1;
        console.log('third', pos)
        await new Promise(res=>setTimeout(res,1000))
    }
}
async function saveGameListIGDBToDB(attribute, condition='', sort='',
                                 limitCount='', offset=''){
    const response = axios({
        url: "https://api.igdb.com/v4/games",
        method: 'POST',
        headers: {
            'Accept': IGDBconfig.IGDB.Accept,
            'Client-ID': IGDBconfig.IGDB.Client_ID,
            'Authorization': IGDBconfig.IGDB.Authorization,
        },
        data: attribute + condition + sort + limitCount + offset
    })
        .then(response => {
            const resultData = response.data;
            resultData.forEach((i,index)=>{
                const gameGameInstance = new gameGameList(i);
                //category, status 영문표기로 변경
                gameGameInstance.category = gameCategory[i.category]
                gameGameInstance.status = gameStatus[i.status]

                //platforms의 category_name 추가해서 저장
                gameGameInstance.platforms.forEach((data, index)=>{
                    data.category_name = gamePlatformsCategory[data.category]
                })
                gameGameInstance.aggregated_rating = Number.parseFloat(gameGameInstance.aggregated_rating / 20).toFixed(2)

                // transToKorea(gameGameInstance.storyline)
                //     .then(data=>{
                //         console.log(data)
                //     })
                //     .catch(err=>{
                //         return err
                //     })
                gameGameInstance.save((err)=>{
                    if(err) return 'err'
                    else return 'save'
                })
            })
            return response.data;
        })
        .catch(err => {
            console.error(err);
        });
    return gameGameList
}

module.exports = {
    initGameList,
    saveGameList:initGameListSave,
    getGameList:gameGameList
}
