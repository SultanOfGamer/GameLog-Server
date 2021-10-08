
//TODO recommand 하는 몇개의 자료, 몇개의 attribute를 사용해야 할 것인가?

const {Bayes} = require('nodeml')
let bayes = new Bayes();


function testRecommnad(){
    const {sample, CF, evaluation} = require('nodeml')
    const movie = sample.movie();

    let train = [], test = []
    for (let i = 0; i < movie.length; i++) {
        if (Math.random() > 0.8) test.push(movie[i]);
        else train.push(movie[i])
    }
    const cf = new CF();

    cf.maxRelatedItem = 40;
    cf.maxRelatedUser = 40;

    cf.train(train, 'user_id', 'movie_id', 'rating');

    let gt = cf.gt(test, 'user_id', 'movie_id', 'rating')
    let gtr = {};
    let users = [];
    for (let user in gt) {
        gtr[user] = gt[user];
        users.push(user);
        if (users.length === 100) break;
    }
    // console.log(users)
    let result = cf.recommendToUsers(['1'], 10);
    console.log(result)
    // let ndcg = evaluation.ndcg(gtr, result);
}

// testRecommnad()
function recommand({user, genres, themes}){
    let result // 추천하는 game list



    return result
}

module.exports = {
    recommand:recommand
}