
// 서버 구축시 실행하는 파일, database 구축
const mongoose = require('../initDB')


const gameGameModes = require('../gameGameModes')
const gameGenres = require('../gameGenresDB')
const gamePlatforms = require('../gamePlatforms')
const gameThemes = require('../gameThemes')
const gameList = require('../gamesDB')

async function initSaveDB(){
    await gameGameModes.saveGameModesDB();
    await gameGenres.saveGenresDB();
    await gamePlatforms.savePlatformsDB();
    await gameThemes.saveThemesDB();
    console.log('gernes modes platform thems save ')
    gameList.saveGameList();
}

initSaveDB()
    .then(()=>{
        // console.log('save success')
    });