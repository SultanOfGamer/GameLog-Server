const userGame = [
    {
        userid:user.id,
                        // game list 에서 받아온 game 정보 저장
                        gameId: tempGame.id,
                        gameName: tempGame.name,
                        cover: {
                            id:tempGame.cover[0].id,
                            game:tempGame.id,
                            height:tempGame.cover[0].height,
                            width:tempGame.cover[0].width,
                            url:tempGame.cover[0].url
                        },
                        aggregated_rating: tempGame.aggregated_rating,
                        aggregated_rating_count: tempGame.aggregated_rating_count,
                        first_release_date: tempGame.first_release_date,

                        //유저측, 전송되는 데이터, request body로 받을 것
                        userGameRating: body.userGameRating,
                        // userGameEvalText: body.userGameEvalText,
                        userGameMemo: body.userGameMemo,
                        userGameStatus: body.userGameStatus,
                        //정보가 저장된 시점
                        createdTime: getDate.getDateUNIX(),
                        wishTime: wishTime
    }
]

module.exports = userGame