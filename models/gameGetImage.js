
const axios = require('axios')

const IGDBconfig = require('../config/IGDBconfig.json')



function gameGetImage(type,
                      attribute,
                      condition='',
                      sort='',
                      limitCount=''){

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
            // saveGameList(response.data);
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.error(err);
        });
    return response
}
module.exports = gameGetImage
