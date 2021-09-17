
const mongoose = require('./initDB')


const gameGameModesSchema = new mongoose.Schema({
    id:{type:Number, unique: true},
    name:{type:String, unique: true},
    slug:{type:String},
    created_at:{type:Number},
    updated_at:{type:Number},
})

const axios = require('axios')
const gameGameModes = mongoose.model('game_GameModes', gameGameModesSchema);
// gameCategory.collection.createIndex({id:1},{unique:true})

const IGDBconfig = require('../config/IGDBconfig.json')

function saveGameModesDB(){
    const response = axios({
    url: "https://api.igdb.com/v4/game_modes",
    method: 'POST',
    headers: {
        'Accept': IGDBconfig.IGDB.Accept,
        'Client-ID': IGDBconfig.IGDB.Client_ID,
        'Authorization': IGDBconfig.IGDB.Authorization,
    },
    data: "fields *; limit 50;"
})
    .then(response => {
        const resultData = response.data;
        resultData.forEach(i => {
            const gameGameModesInstance = new gameGameModes(i);
            gameGameModesInstance.save((err) => {
                if (err) return 'err'
                else return 'save complete'
            })
        })
    })
    .catch(err => {
        console.error(err);
        console.log('err dad')
    });
    return response
}



module.exports={
    saveGameModesDB:saveGameModesDB,
    getGameModes:gameGameModes
}
