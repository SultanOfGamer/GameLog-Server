const initDB = require('./initDB')

const userDatabase = require('./userDatabase')
const getUserGames = require('./userGameDB').getUserGames;

const getGameModes = require('./gameGameModes').getGameModes
const getGenres = require('./gameGenresDB').getGameGenresDB
const getPlatforms = require('./gamePlatforms').getGamePlatforms
const getThemes = require('./gameThemes').getGameThemes

const getGameList = require('./gamesDB').getGameList


module.exports = {
    userDatabase,
    getUserGames,

    getGameModes,
    getGenres,
    getPlatforms,
    getThemes,

    getGameList,
}