
const gameList = require('../models/index').getGameList;
const userGame = require('../models/index').getUserGames;

async function getSearchResult(name){
    const pageCount = 10;
    const string = name;
    const reg = new RegExp(string, 'i')
    return new Promise(function(resolve, reject){
        gameList.find({name:{$regex:name, $options: "i"}},{id:1, name:1, cover:1})
            .select({_id:0}) //_id 제거
            .limit(pageCount)
            .skip(pageCount)
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
    })
}

//위의 결과와 밑의 결과의 중복x 합쳐서 전송하는 방법을 고안

function getAlterSearch(name){
    const pageCount = 10;
    return new Promise(function(resolve, reject){
        gameList.find({'alternative_names.name':{$regex:name, $options: "i"}},{id:1,name:1, cover:1})
        .limit(pageCount)
        .skip(pageCount)
        .then(data=>{
            console.log(data)
            resolve(data)
        })
    })
}

function checkSelectedGame(user, gameId){
    return new Promise(function (resolve, reject){
        userGame.findOne({userid:user.id, gameId:gameId})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
    })
}

function getSelectedGame({id}){
    return new Promise(function(resolve, reject){
        gameList.findOne({id:id})
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
    })
}
module.exports={
    getSearchResult:getSearchResult,
    getAlterSearch:getAlterSearch,

    getSelectedGame:getSelectedGame,
    checkSelectedGame:checkSelectedGame
}