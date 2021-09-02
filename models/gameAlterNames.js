const mongoose = require('./initDB')

const gameAlterNamesSchema = new mongoose.Schema({
    id:{type:String,unique:true},
    name:{type:String},
    game:{type:String},
    comment:{type:String},
})


const axios = require('axios')
const gameAlterNames = mongoose.model('game_alternames', gameAlterNamesSchema);

const IGDBconfig = require('../config/IGDBconfig.json')
function saveMongoDBdata(){

}
//TODO offset 설정, 모두 저장
const response = axios({
    url: "https://api.igdb.com/v4/alternative_names",
    method: 'POST',
    headers: {
        'Accept': IGDBconfig.IGDB.Accept,
        'Client-ID': IGDBconfig.IGDB.Client_ID,
        'Authorization': IGDBconfig.IGDB.Authorization,
    },
    data: "fields *; limit 100;"
})
    .then(response => {
        const resultData = response.data;
        resultData.forEach(i => {
            const gameAlterNameInstance = new gameAlterNames(i);
            gameAlterNameInstance.save((err) => {
                if (err) return 'err'
                else return 'save complete'
            })
        })
    })
    .catch(err => {
        console.error(err);
        console.log('err')
    });


module.exports= gameAlterNames
