const initDB = require('./initDB')

const userDatabase = require('./userDatabase')

const gameGameModes = require('./gameGameModes')
const gameGenres = require('./gameGenresDB')
const gamePlatforms = require('./gamePlatforms')
const gameThemes = require('./gameThemes')

const gameDB = require('./gamesDB')
const getAlterNames = require('./gameAlterNames')

module.exports = {
    userDatabase:userDatabase,

    getGameModes:gameGameModes.getGameModes,
    getGenres:gameGenres.getGameGenresDB,
    getPlatforms:gamePlatforms.getGamePlatforms,
    getThemes:gameThemes.getGameThemes,

    gameDB:gameDB,
    getAlterNames:getAlterNames
}