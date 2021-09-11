
// 서버 구축시 실행하는 파일, database 구축
const initDB = require('./initDB')


const gameGameModes = require('./gameGameModes')
const gameGenres = require('./gameGenresDB')
const gamePlatforms = require('./gamePlatforms')
const gameThemes = require('./gameThemes')
const gameList = require('./gamesDB')

gameGameModes.saveGameModesDB();
gameGenres.saveGenresDB();
gamePlatforms.savePlatformsDB();
gameThemes.savePlatformsDB();

gameList.saveGameList();
