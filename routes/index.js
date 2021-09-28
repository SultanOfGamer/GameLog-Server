
const auth = require('./auth')

//Tab bar(footer) 기준으로 라우팅 분리

const home = require('./tabBarHome')
const search = require('./tabBarSearch')

const LibAndWish = require('./tabBarLibAndWish');

const userProfile = require('./userProfile')
module.exports = {
    auth:auth,
    home:home,

    search:search,

    LibAndWish:LibAndWish,

    userProfile:userProfile
}