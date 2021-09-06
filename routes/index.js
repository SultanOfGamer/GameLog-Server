
const auth = require('./auth')

//Tab bar(footer) 기준으로 라우팅 분리

const home = require('./home')
const library = require('./library')
const wishlist = require('./wishlist');
const search = require('./search')

module.exports = {
    auth:auth,
    home:home,
    library:library,
    wishlist:wishlist,
    search:search,
}