



module.exports = {
    getGame:function(model){// init data
        const response = model.find()
            .where('aggregated_rating').gte(95)
            .where('aggregated_rating_count').gt(5)
            .sort('aggregated_rating')
            .limit(10)
            .then(data=>{
                return data
            })
        return response
    },
    getCategory:function(type, model){ // 테마, 장르 보내기, 각 별로 게임 불러오기
        let response;
        switch(type){
            case 'genres':
                response = model.find()
                    .limit(30)
                    .then(data=>{
                        return data
                    })
                break
            case 'themes':
                response = model.find()
                    .limit(30)
                    .then(data=>{
                        return data
                    })
                break
        }
        return response
    },
    getGenres:function(model){

    },
    updateGame: function (  ) {

    }
}