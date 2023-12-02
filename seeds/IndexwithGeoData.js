if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const internshipData= require('./file');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const seedDB = async () => {
    geodata=[];
    for (let i = 0; i < internshipData.length; i++) {
        nestedArray=[];
        for (let j=0; j<internshipData[i].location.length; j++){
            try {
                const geoData = await geocoder.forwardGeocode({
                    query: internshipData[i].location[j],
                    limit: 1
                }).send()
    
                // geodata[i][j]=geoData.body.features[0].geometry;
                nestedArray.push(geoData.body.features[0].geometry.coordinates);
       
            } catch (error) {
                console.log(i,j);
                console.log(internshipData[i].location)
                console.log(internshipData[i].company)
            }
        }
        geodata.push(nestedArray);
    }
    return geodata;
}
console.log("Done");
seedDB().then((geodata) => {
    console.log(geodata);
})