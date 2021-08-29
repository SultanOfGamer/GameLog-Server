const mongoose = require('./initDB')

const gameGameModesSchema = new mongoose.Schema({
    id:{type:String, unique: true},
    name:{type:String},
    slug:{type:String},
    alternative_name:{type:String},
    created_at:{type:String},
    updated_at:{type:String},
    category_id:{type:String},
    category_name:{type:String}
})

const gameGameModesCategory = {
    1: "console",
    2: "arcade",
    3: "platform",
    4: "operating_system",
    5: "portable_console",
    6: "computer"
}

const axios = require('axios')
const gameGameModes = mongoose.model('gameGameModes', gameGameModesSchema);

const IGDBconfig = require('../config/IGDBconfig.json')

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
            const gameGameModesDB = new gameGameModes(i);
            gameGameModesDB.category_id = i.category
            gameGameModesDB.category_name = gameGameModesCategory[i.category]
            gameGameModesDB.save((err) => {
                if (err) return 'err'
                else return 'save complete'
            })
        })
        gameGameModes.find({}, function(err, game){
            // console.log(game)
        })
    })
    .catch(err => {
        console.error(err);
        console.log('err')
    });

// gameGameModes