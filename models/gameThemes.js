const mongoose = require('./initDB')

const gameThemesSchema = new mongoose.Schema({
    id:{type:String, unique: true},
    name:{type:String, unique: true},
    slug:{type:String, unique: true},
    created_at:{type:String},
    updated_at:{type:String},
})

const axios = require('axios')
const gameThemes = mongoose.model('game_Themes', gameThemesSchema);
// gameCategory.collection.createIndex({id:1},{unique:true})

const IGDBconfig = require('../config/IGDBconfig.json')

function saveThemesDB(){
    const response = axios({
        url: "https://api.igdb.com/v4/themes",
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
                const gameThemesInstance = new gameThemes(i);
                gameThemesInstance.save((err) => {
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
    saveThemesDB:saveThemesDB,
    getGameThemes: gameThemes
}

