const recommandUser = require('./createRecommandUser')

const signUp = require('../../controll/index').users.signupInsert
const updateUserPrefer = require('../../controll/index').users.updateUserPrefer
const insertUserGame = require('../../controll/userGames').insertUserGames;

const gameList = require('../index').getGameList;
const userDB = require('../index').userDatabase;

async function getCategoryGame(categories){
    for(let gameCategory of categories){
        const {category, id, name} = gameCategory
        const showNum = 50;
        const gameForCount = await gameList.find({[`${category}.id`]:id}, {id:1})
        const count = gameForCount.length
        const randomPage = Math.floor(Math.random() * parseInt(count / showNum))

        const result = await gameList.find({[`${category}.id`]:id},
            {id:1, name:1, aggregated_rating:1})
            .select({_id:0})
            .limit(showNum)
            .skip(randomPage * showNum)
        return result

    }
}

async function saveUserAndGame(users){
    await new Promise(res=>setTimeout(res,1000))

    for(let user of users){
        //test user 회원가입
        await signUp(user, user.password)
        const userId = await userDB.findOne({email:user.email}, {id:1}).select({_id:0})
        user.id = userId.id;

        //test user prefer category update
        await updateUserPrefer(user, user.preferCategory)

        const recommandGames = await getCategoryGame(user.preferCategory)
        for(let game of recommandGames){
            game.userGameRating = game.aggregated_rating;
            game.gameId = game.id;
            await insertUserGame(user, game, 'library');
        }
    }
}

async function main(){
    await saveUserAndGame(recommandUser)
}

main()
    .then(r=>{
        console.log('랜덤 추천 게임 저장 완료')
    });

module.exports = main;