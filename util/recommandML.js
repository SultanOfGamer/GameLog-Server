module.exports = {
    function() {
        const {sample, CF, evaluation} = require('nodeml')


        const movie = sample.movie();

        let train = [], test = []
        for (let i = 0; i < movie.length; i++) {
            if (Math.random() > 0.8) test.push(movie[i]);
            else train.push(movie[i])
        }
        console.log(test)
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
        let result = cf.recommendToUsers(users, 40);
        console.log(result)
        let ndcg = evaluation.ndcg(gtr, result);
        console.log(ndcg);
    }
}