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
function getUserGamesEval(user){
    return new Promise(function(resolve, reject){
        userGameModel.find({userid:{$ne:user.id}, userGameStatus:{$ne:'wish'}},
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
    const game = await getUserGamesEval(user);

    let train = [], test = []
    for (let i = 0; i < game.length; i++) {
        if (Math.random() > 0.7) test.push(game[i]);
        else train.push(game[i])
    }

    const cf = new CF();
    cf.maxRelatedItem = 20;
    cf.maxRelatedUser = 10;

    cf.train(train, 'userid', 'gameId', 'userGameRating');
    let users = [user.id];

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
    return result[user.id]
}

async function recommandGameList(user){
    const recoGameList = await userBasedRecommnad(user)
    const sendGameList = recoGameList.map( async (game)=>{
        const result =  await gameGameList.findOne({id:game.gameId},
            {id:1, name:1, cover:1})
            .select({_id:0})
        return result;
    })
    return new Promise((resolve, reject)=>{
        Promise.all(sendGameList).then(r=>{
            resolve(r)
        })
    })
}

module.exports = {
    userBasedRecommnad,
    contentBasedRecommand,
    recommandGameList,
}
