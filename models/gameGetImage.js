
const axios = require('axios')

const IGDBconfig = require('../config/IGDBconfig.json')


function renameKey ( obj, oldKey, newKey ) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}



function gameGetImage(type,
                      attribute,
                      condition='',
                      sort='',
                      limitCount='',
                      time = 0){

    const response = axios({
        url: "https://api.igdb.com/v4/"+type,
        method: 'POST',
        headers: {
            'Accept': IGDBconfig.IGDB.Accept,
            'Client-ID': IGDBconfig.IGDB.Client_ID,
            'Authorization': IGDBconfig.IGDB.Authorization,
        },
        data: attribute + condition + sort + limitCount
    })
        .then(response => {
            let result =  response.data;
            // if(type === 'screenshots'){
                setTimeout(() => {

                }, time*1000);
            // }
            return result;
        })
        .catch(err => {
            console.error(err);
        });
    return response
}
module.exports = gameGetImage
