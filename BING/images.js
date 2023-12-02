if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const {internshipData,geometry}= require('../seeds/file');
const {imagebank}= require('./imagebank');
'use strict';
let request = require('request');
let subscriptionKey = process.env.BING_KEY;
let endpoint = process.env.BING_ENDPOINT + '/v7.0/images/search';
let mkt = 'en-US'

searchingForImageAI = function (company, location) {
    return new Promise(function (resolve, reject) {
        const query = `Image of headquarters office of ${company} in ${location}`;
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
                if (body){
                    if (body.value === undefined){
                        reject(company, location);
                    }
                    else{
                        const length = body.value.length < 30? body.value.length : 30;
                        const imagesURL = [];
                        for (i = 0; i < length; i++) {
                            imagesURL.push(body.value[i].thumbnailUrl);
                        }
                        resolve(imagesURL);
                    }
                }
                else{
                    resultImage=[];
                    const i = Math.floor(Math.random() * 14);
                    for (let j=0; j<i;j++){
                        const random = Math.floor(Math.random() * imagebank.length);
                        while (resultImage.includes(imagebank[random])){
                            random = Math.floor(Math.random() * imagebank.length);
                        }
                        resultImage.push(imagebank[random]);
                    }
                    resolve(imagebank);
                }
            } else {
                reject(error);
            }
        })
    });
}
// const seedDB = async () => {
//     imagedata=[];
//     for (let i = 70; i < internshipData.length; i++) {
//         nestedArray=[];
//         for (let j=0; j<internshipData[i].location.length; j++){
//             try {
//                 const company = internshipData[i].company;
//                 const location = internshipData[i].location[j];
//                 image= await searchingForImageAI(company, location);
//                 nestedArray.push(image);
       
//             } catch (error) {
//                 console.log(i,j);
//                 console.log(error);
//             }
//         }
//         imagedata.push(nestedArray);
//     }
//     return imagedata;
// }
// seedDB().then((imagedata) => {
//     console.log(imagedata);
// })
// async function main() {
//     try {
//         const company = internshipData[5].company;
//         const location = internshipData[5].location[0];
//         const a = await searchingForImageAI(company, location);
//         console.log(a);
//     } catch (error) {
//         console.log(error);
//     }
// }
// main();
module.exports= searchingForImageAI;