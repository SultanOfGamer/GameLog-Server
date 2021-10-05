
const gameList = require('../models/index').getGameList;
// const userGame = require('../models/index').getUserGames;

async function getSearchResult(name){
    const pageCount = 10;
    const string = name;
    const reg = new RegExp(string, 'i')
    const result = await gameList.find(
        {
            name:
                {
                    $regex:name,
                    $options: "i"
                }
        },
        {id:1, name:1, cover:1})
        .select({_id:0}) //_id 제거
        .limit(pageCount)
        .skip(pageCount)
    return result
}

async function getAlterSearch(name){
    const pageCount = 10;
    const result = await gameList.find(
        {'alternative_names.name':{$regex:name, $options: "i"}},
        {id:1,name:1, cover:1})
        .select({_id:0})
        .limit(pageCount)
        .skip(pageCount)
    return result
}

module.exports={
    getSearchResult,
    getAlterSearch,
}