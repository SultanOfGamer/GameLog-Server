//
// const mongoose = require('mongoose')
// const url = 'mongodb://127.0.0.1:27017/testserver';
//
// const db = mongoose.connect(url, (err)=>{
//     if(err){
//         console.log(err.message);
//     }else{
//         console.log('mongodb success connect!')
//     }
// })


const mongoose = require('./initDB')


const gameGenresSchema = new mongoose.Schema({
    id:{type:String, unique: true},
    name:{type:String, unique: true},
    slug:{type:String, unique: true},
    created_at:{type:String},
    updated_at:{type:String},
})

const axios = require('axios')
const gameGenres = mongoose.model('gameGenres', gameGenresSchema);
// gameCategory.collection.createIndex({id:1},{unique:true})


const IGDBconfig = require('../config/IGDBconfig.json')


// module.exports = gameGenres
module.exports ={ //limit를 설정해서 데이터 가져오기
    gameGenresSave:function(){
        const response = axios({
            url: "https://api.igdb.com/v4/genres",
            method: 'POST',
            headers: {
                'Accept': IGDBconfig.IGDB.Accept,
                'Client-ID': IGDBconfig.IGDB.Client_ID,
                'Authorization': IGDBconfig.IGDB.Authorization,
            },
            data: "fields *; limit 50;"
        })
            .then(response => {
                // return response.data
                const gameData = response.data;
                gameData.forEach(i => {
                    const gameGenresDB = new gameGenres(i);
                    gameGenresDB.save((err) => {
                        if (err) return 'err'
                        else return 'save complete'
                    })
                })
            })
            .catch(err => {
                console.error(err);
                console.log('err')
            });
        return gameGenres;
    },
    getGameGenresDB: gameGenres
}
