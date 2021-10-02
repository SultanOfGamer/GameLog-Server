
const gameList = require('../models/index').getGameList;
// const userGame = require('../models/index').getUserGames;

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

function getAlterSearch(name){
    const pageCount = 10;
    return new Promise(function(resolve, reject){
        gameList.find({'alternative_names.name':{$regex:name, $options: "i"}},{id:1,name:1, cover:1})
            .select({_id:0})
            .limit(pageCount)
            .skip(pageCount)
            .then(data=>{
                resolve(data)
            })
    })
}

module.exports={
    getSearchResult:getSearchResult,
    getAlterSearch:getAlterSearch,

}