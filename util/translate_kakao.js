
const axios = require('axios')
const kakaoConfig = require('../config/translate.json')

const RESTAPIKEY = kakaoConfig.kakao.RESTAPIKEY;

async function translateKAKAO (query){
    return new Promise(function(resolve, reject){
        const api_url = 'https://dapi.kakao.com/v2/translation/translate';
        const response = axios(
            {
                method: 'post',
                url:api_url,
                headers: {
                    'Content-Type':"application/x-www-form-urlencoded",
                    'Authorization': "KakaoAK " + RESTAPIKEY,
                },
                data:`src_lang=en&target_lang=kr&query=${query}`
            })
            .then(response =>{
                console.log(response.data)
                console.log(query)
                // console.log(response.data.translated_text[0])
                resolve(response.data.translated_text[0])
            }).catch(err=>{
                console.log(err)
                reject(err)
            })
    })
}

module.exports = {
    translateKAKAO:translateKAKAO
}