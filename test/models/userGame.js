const getDate = require('../../util').date

const userGame = (user, game, body) =>{
    return [
        {
            userid:user.id,
            // game list 에서 받아온 game 정보 저장
            gameId: game.id,
            gameName: game.name,
            cover: {
                id:game.cover[0].id,
                game:game.id,
                height:game.cover[0].height,
                width:game.cover[0].width,
                url:game.cover[0].url
            },
            aggregated_rating: game.aggregated_rating,
            aggregated_rating_count: game.aggregated_rating_count,
            first_release_date: game.first_release_date,

            //유저측, 전송되는 데이터, request body로 받을 것
            userGameRating: body.userGameRating,
            // userGameEvalText: body.userGameEvalText,
            userGameMemo: body.userGameMemo,
            userGameStatus: body.userGameStatus,
            //정보가 저장된 시점
            createdTime: getDate.getDateUNIX(),
            wishTime: getDate.getDateUNIX()
        }
    ]
}

module.exports = userGame