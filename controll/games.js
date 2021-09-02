



module.exports = {
    getGame:function(model){// 조건 argument 설정
        const response = model.find()
            .where('aggregated_rating').gte(97)
            .where('aggregated_rating_count').gt(5)
            .sort('aggregated_rating')
            .then(data=>{
                return data
            })
        return response
    },
    getGameOptions:function(model, id){
        const tempGame = model.find({id:id},function(err,data){
            if(err) return 'err'
            console.log(data)
        })
            // .then(data=>{
            //     console.log(data)
            // })
    },
    tansferGameList:function(){

        this.getGame(model)

    },
    updateGame: function (  ) {

    }
}