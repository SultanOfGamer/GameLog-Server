
const auth = require('./auth')

//Tab bar(footer) 기준으로 라우팅 분리

const home = require('./home')
const search = require('./search')

const gameUser = require('./game');

const userProfile = require('./userProfile')
module.exports = {
    auth:auth,
    home:home,

    search:search,

    gameUser:gameUser,

    userProfile:userProfile
}