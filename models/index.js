const initDB = require('./initDB')

const userDatabase = require('./userDatabase')

const gameGameModes = require('./gameGameModes')
const gameGenres = require('./gameGenresDB')
const gamePlatforms = require('./gamePlatforms')
const gameThemes = require('./gameThemes')

const gameDB = require('./gamesDB')

module.exports = {
    userDatabase:userDatabase,

    gameGameModes:gameGameModes,
    gameGenres:gameGenres,
    gamePlatforms:gamePlatforms,
    gameThemes:gameThemes,
    gameGameModes:gameGameModes,
    gameDB:gameDB
}