
const axios = require('axios')
const kakaoConfig = require('../config/translate.json')

const RESTAPIKEY = kakaoConfig.kakao.RESTAPIKEY;

async function translateKAKAO (query_test){
    const query = '"It is a new beginning for Kratos. Living as a man, outside the shadow of the gods, he seeks solitude in the unfamiliar lands of Norse mythology. With new purpose and his son at his side, Kratos must fight for survival as powerful forces threaten to disrupt the new life he has created..."'
    const api_url = 'https://dapi.kakao.com/v2/translation/translate';
    const response = await axios(
        {
            method: 'post',
            url:api_url,
            headers: {
                'Content-Type':"application/x-www-form-urlencoded",
                'Authorization': "KakaoAK " + RESTAPIKEY,
            },
            data:`src_lang=en&target_lang=kr&query=${query}`
        }
    )
        .then(response =>{
            console.log(response.data)
            console.log(response.data.translated_text[0])
        }).catch(err=>{
            console.log(err)
        })
    return response
}

module.exports = {
    translateKAKAO:translateKAKAO()
}