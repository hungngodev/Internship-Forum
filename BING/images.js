if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
'use strict';
let request = require('request');
let subscriptionKey = process.env.BING_KEY;
let endpoint = process.env.BING_ENDPOINT + '/v7.0/images/search';
let mkt = 'en-US'
searchingForImageAI = function (company, location) {
    return new Promise(function (resolve, reject) {
        const query = `Image of company ${company} in ${location}`;
        let request_params = {
            method: 'GET',
            uri: endpoint,
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey
            },
            qs: {
                q: query,
                mkt: mkt
            },
            json: true
        }
        request(request_params, function (error, response, body) {
            if (!error) {
                // console.error('error:', error)
                // console.log('original query: ' + body.queryContext.originalQuery)
                const length = body.value.length < 3 ? body.value.length : 3;
                const imagesURL = [];
                for (i = 0; i < length; i++) {
                    imagesURL.push(body.value[i].thumbnailUrl);
                }
                resolve(imagesURL);
            } else {
                reject(error);
            }
        })
    });
}
async function main() {
    try {
        const a = await searchingForImageAI("Google", "New York");
        console.log(a);
        console.log("hi");
    } catch (error) {
        console.log(error);
    }
}
module.exports= searchingForImageAI;