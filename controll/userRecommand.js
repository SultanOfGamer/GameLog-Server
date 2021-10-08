const {CF, evaluation} = require('nodeml')


const gameGameList = require('../models/index').getGameList
const userGameModel = require('../models/index').getUserGames;

async function getConBasedGame(){
    const game = await gameGameList.find({},
        {
            id:1,
            name:1,
            aggregated_rating:1,
            aggregated_rating_count:1,
            category:1,
            genres:1,
            themes:1
        })
        .select({_id:0})
    return game;
}
function getUserGamesEval(){
    return new Promise(function(resolve, reject){
        userGameModel.find({userGameStatus:{$ne:'wish'}},
            {id:1, userid:1, gameId:1, aggregated_rating:1, aggregated_rating_count:1,
                userGameRating:1})
            .select({_id:0})
            .then(data=>{
                resolve(data)
            }).catch(err=>{
            reject(err)
        })
    })
}

// 선택 플랫폼, genres기반
async function contentBasedRecommand(){
    await new Promise(res=>setTimeout(res,1000))
    const games = await getConBasedGame()

}

// user에 library가 쌓여있을때 based 추천
// Collaborative Filtering Function
async function userBasedRecommnad(user){
    await new Promise(res=>setTimeout(res,1000))
    const game = await getUserGamesEval();

    let train = [], test = []
    for (let i = 0; i < game.length; i++) {
        if (Math.random() > 0.8) test.push(game[i]);
        else train.push(game[i])
    }

    const cf = new CF();
    cf.maxRelatedItem = 40;
    cf.maxRelatedUser = 40;

    cf.train(train, 'userid', 'gameId', 'userGameRating');
    // let gt = cf.gt(test, 'userid', 'gameId', 'userGameRating')
    // let gtr = {};
    let users = [user.id];
    // for (let user in gt) {
    //     gtr[user] = gt[user];
    //     users.push(user);
    //     if (users.length === 10) break;
    // }
    //1명의 유저, 10개의 추천 game
    let result = cf.recommendToUsers(users, 10);
    //result key 변경
    result[user.id].forEach(item=>{
        if (item.hasOwnProperty('play')) {
            item.score= item.play;
            delete item.play;
        }
        if(item.hasOwnProperty('itemId')){
            item.gameId = item.itemId;
            delete item.itemId;
        }
    })
    return result
}
userBasedRecommnad({id:2})
    .then(r=>{
        console.log(r)
    })
module.exports = {
    userBasedRecommnad,
    contentBasedRecommand,
}
