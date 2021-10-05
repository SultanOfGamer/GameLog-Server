// Game Database 번역해야 하는 글자 수 체크 함수

const mongoose = require('../initDB')

const gameGameList = require('../gamesDB').getGameList

async function getStringCount(){
    // 띄어쓰기 포함 count
    await new Promise(res=>setTimeout(res,1000))
    const pageCount = 50;
    let stringCount = 0;
    let test = await gameGameList.find({}, {summary:1, storyline:1})

    for(const game of test){
        const {summary, storyline} = game
        if(!summary) continue;
        if(!storyline) continue;
        stringCount += summary.length + storyline.length
    }
    console.log(stringCount)
}
getStringCount()

module.exprts = {
    getStringCount
}