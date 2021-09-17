const mongoose = require('./initDB')

const gamePlatformsSchema = new mongoose.Schema({
    id:{type:Number, unique: true},
    name:{type:String},
    slug:{type:String},
    alternative_name:{type:String},
    created_at:{type:Number},
    updated_at:{type:Number},
    category_id:{type:Number},
    category_name:{type:String}
})

const gamePlatformsCategory = {
    1: "console",
    2: "arcade",
    3: "platform",
    4: "operating_system",
    5: "portable_console",
    6: "computer"
}

const axios = require('axios')
const gamePlatforms = mongoose.model('game_Platforms', gamePlatformsSchema);

const IGDBconfig = require('../config/IGDBconfig.json')

function savePlatformsDB(){
    const response = axios({
    url: "https://api.igdb.com/v4/platforms",
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
        const resultData = response.data;
        resultData.forEach(i => {
            const gamePlatformsInstance = new gamePlatforms(i);
            gamePlatformsInstance.category_id = i.category
            gamePlatformsInstance.category_name = gamePlatformsCategory[i.category]
            gamePlatformsInstance.save((err) => {
                if (err) return 'err'
                else return 'save complete'
            })
        })
        // gamePlatforms.find({}, function(err, game){
        //     // console.log(game)
        // })
    })
    .catch(err => {
        console.error(err);
        console.log('err')
    });
    return response
}


// gameGameModes

module.exports={
    savePlatformsDB:savePlatformsDB,
    getGamePlatforms:gamePlatforms
}