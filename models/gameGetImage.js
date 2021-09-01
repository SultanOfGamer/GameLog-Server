
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
            let result =  response.data;
            // result.forEach(obj=>renameKey(obj, 'id', 'cover_id'));
            // console.log(result)
            // const updatedJson = JSON.stringify( result )
            // console.log(updatedJson)
            return result;
        })
        .catch(err => {
            console.error(err);
        });
    return response
}
module.exports = gameGetImage
