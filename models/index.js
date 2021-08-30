const initDB = require('./initDB')

const userDatabase = require('./userDatabase')

const gameGameModes = require('./gameGameModes')
const gameGenres = require('./gameGameModes')
const gamePlatforms = require('./gameGameModes')
const gameThemes = require('./gameGameModes')
const gameGameModes = require('./gameGameModes')

const gameDB = require('./gamesDB')

module.exports = {
    userDatabase:userDatabase,

    gameGameModes:gameGameModes,
    gameGenres:gameGenres,
    gamePlatforms:gamePlatforms,
    gameThemes:gameThemes,
    gameGameModes:gameGameModes,
    gmaeDB:gameDB
}