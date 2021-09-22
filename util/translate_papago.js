const papagoConfig = require('../config/translate.json')

const client_id = papagoConfig.papago.Client_ID;
const client_secret = papagoConfig.papago.Client_Secret;

const axios = require('axios')

async function translateToKor (query_test){
    const query = 'my name is GameLog'
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    const options = {
        url: api_url,
        method: 'POST',
        form: {'source':'en', 'target':'ko', 'text':query},
        headers: {
            'X-Naver-Client-Id':client_id,
            'X-Naver-Client-Secret': client_secret
        }
    };
    const data = {'source':'en', 'target':'ko', 'text':query}
    const config = {
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        }
    }
    const response = await axios.post(api_url, data, config)
        .then(response =>{
            console.log(response)
        }).catch(err=>{
            console.log(err)
        })
    return response
}

module.exports = {
    translateToKor:translateToKor()
}