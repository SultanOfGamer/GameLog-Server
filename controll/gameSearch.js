
const gameList = require('../models/index').getGameList;

async function getSearchResult(name, offset){
    const pageCount = 30;
    const string = name;
    const reg = new RegExp(string, 'i')
    return new Promise(function(resolve, reject){
        gameList.find({name:{$regex:name, $options: "i"}},{name:1})
            .limit(pageCount)
            .skip(offset * pageCount)
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                reject(err)
            })
    })
}

module.exports={
    temp:function(){

    }
}

module.exports={
    getSearchResult:getSearchResult,
    getAlterSearch:getAlterSearch,
}