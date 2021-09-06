
const users = require('./user')
const games = require('./games')
const userGames = require('./userGames')

const passport = require('./passport')

module.exports = {
    users:users,
    userGames:userGames,
    games:games,

    passport:passport
}