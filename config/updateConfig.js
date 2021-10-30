const request = require('request');
const fs = require('fs');

const IGDBconfig = require('./IGDBconfig.json')
const {client_id, client_secret, grant_type} = {...IGDBconfig.IDAndSecret}

const options = {
    uri:'https://id.twitch.tv/oauth2/token',
    method:'POST',
    qs:{
        client_id,
        client_secret,
        grant_type
    }
}
request(options, function (error, response, body) {
    // console.log(response)
    const bodyJSON = JSON.parse(body)
    const tokenJSON = {
        IGDB:{
            Accept: "application/json",
            Client_ID:IGDBconfig.IDAndSecret.client_id,
            Authorization:bodyJSON.token_type + ' ' + bodyJSON.access_token
        },
        IDAndSecret:IGDBconfig.IDAndSecret
    }
    fs.writeFileSync('IGDBconfig.json', JSON.stringify(tokenJSON))
});