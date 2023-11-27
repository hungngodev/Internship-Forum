if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const cities = require('./cities');
const internshipData= require('./file');
const Internship = require('../models/internship');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/internship';
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Internship.deleteMany({});
    for (let i = 0; i < internshipData.length; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const salary = Math.floor(Math.random() * 50) + 10;
        for (let j=0; j<internshipData[i].location.length; j++){
            try {
                const geoData = await geocoder.forwardGeocode({
                    query: internshipData[i].location[j],
                    limit: 1
                }).send()
                const camp = new Internship({
                    author: '655d255ce4296bf70020e31a',
                    location: internshipData[i].location[j],
                    title: internshipData[i].title,
                    description: internshipData[i].description,
                    salary: !(internshipData[i].salary==null) ? internshipData[i].salary.toFixed(1) : 0,
                    area: internshipData[i].area,
                    company: internshipData[i].company,
                    link:internshipData[i].link,
                    geometry: geoData.body.features[0].geometry,
                    images: [
                        {
                            url: 'https://res.cloudinary.com/dj6dtuqnr/image/upload/v1700518556/samples/landscapes/landscape-panorama.jpg',
                            filename: 'samples/landscapes'
                        },
                        {
                            url: 'https://res.cloudinary.com/dj6dtuqnr/image/upload/v1700518556/samples/landscapes/landscape-panorama.jpg',
                            filename: 'samples/landscapes'
                        }
                    ]
                })
                await camp.save();
            } catch (error) {
                console.log(i,j);
                console.log(internshipData[i].location)
                console.log(internshipData[i].geometry)
            }
        }
    }
}
console.log("Done");
seedDB().then(() => {
    mongoose.connection.close();
})