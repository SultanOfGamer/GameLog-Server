
const users = require('./user')
const userProfile = require('./userProfile')

const games = require('./games')
const userGames = require('./userGames')

const gameSearch = require('./gameSearch')

const passport = require('./passport')

module.exports = {
    users,
    userProfile,

    userGames,
    games,

    gameSearch,
    passport
}