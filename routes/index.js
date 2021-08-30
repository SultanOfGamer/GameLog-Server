
const auth = require('./auth')

//Tab bar(footer) 기준으로 라우팅 분리
const friend = require('./friend')
const home = require('./home')
const library = require('./library')
const search = require('./search')


module.exports = {
    auth:auth,
    friend:friend,
    home:home,
    library:library,
    search:search,

}