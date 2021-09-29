
const recommandSystem = require('./recommand')
const date = require('./date')

// const translatekakao = require('./translate_kakao').translateKAKAO;

function shuffle(array){
    for (let index = array.length - 1; index >0; index--){
        const randomPosition = Math.floor(Math.random() * (index + 1));
        const temparr = array[index];
        array[index] = array[randomPosition];
        array[randomPosition] = temparr
    }
    return array
}

module.exports = {
    date:date,
    recommandSystem:recommandSystem,
    // transToKorea:translatekakao
    shuffleArray:shuffle
}