
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/testserver';

const db = mongoose.connect(url, (err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log('mongodb success connect!')
    }
})



const gameCategorySchema = new mongoose.Schema({
    id:{type:String, unique: true},
    name:{type:String, unique: true},
    slug:{type:String, unique: true},
    created_at:{type:String, unique: true},
    updated_at:{type:String, unique: true},
})

const axios = require('axios')
const gameCategory = mongoose.model('gameCategory', gameCategorySchema);
// gameCategory.collection.createIndex({id:1},{unique:true})


const IGDBconfig = require('../config/IGDBconfig.json')


function saveCategory(){ //limit를 설정해서 데이터 가져오기
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
            return response.data
        })
        .catch(err => {
            console.error(err);
            console.log('err')
        });
    return response
}
//TODO PROMISE 비동기 저장 시스템
saveCategory().then(response=>{
    // console.log(response)
    const gameData = response;
    let temparray = []
    let tempObject = {}
    // console.log(gameData[0])

    gameData.forEach(i=>{
        const gameCategoryDB = new gameCategory(i);
        gameCategoryDB.save((err) => {
            // gameCategoryDB.findOneAndUpdate({upsert:true})
            if(err) return 'err'
            else return 'save complete'
        })
    })
}).catch(err=>{
    console.log(err)
})

module.exports = gameCategory;