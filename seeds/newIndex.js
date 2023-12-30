if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const {internshipData}= require('./file');
const Internship = require('../models/internship');
const Review = require('../models/review');
const {userData, numberOfUsers} = require('./user'); 
const User = require('../models/user');
const { number } = require('joi');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/internship';
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const imagesURL = require('./images');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const Fakerator = require("fakerator");
const fakerator = Fakerator();
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
const seedDBInternship = async () => {
    await Internship.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});
    await db.dropCollection('sessions');
    for (let i = 0; i < userData.length; i++) {//
        const { email, username, password } = userData[i];
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        userData[i].id=registeredUser._id;
    
    }   
    for (let i = 0; i < internshipData.length; i++) {
        const random= Math.floor(Math.random() * numberOfUsers);
        for (let j=0; j<internshipData[i].location.length; j++){
            try {
                const reviews= internshipData[i].reviews;
                const internshipReview=[];
                for (let k=0; k<reviews.length; k++){
                    const random2= Math.floor(Math.random() * numberOfUsers);
                    const review = new Review({
                        rating: Math.round(reviews[k].rating),
                        body: reviews[k].body,
                        author: userData[random2].id
                    });
                    // const authorReview = User.findById(userData[random2].id);
                    // console.dir(authorReview);
                    // await authorReview.updateOne({ $push: { reviews: review._id } });
                    // await authorReview.save();
                    await review.save();
                    internshipReview.push(review._id);
                }
                const geoData = await geocoder.forwardGeocode({
                    query: internshipData[i].location[j],
                    limit: 1
                }).send()
                const camp = new Internship({
                    author: userData[random].id,
                    location: internshipData[i].location[j],
                    title: internshipData[i].title,
                    description: internshipData[i].description,
                    salary: !(internshipData[i].salary==null) ? internshipData[i].salary.toFixed(1) : 0,
                    area: internshipData[i].area,
                    company: internshipData[i].company,
                    link:internshipData[i].link,
                    // geometry: {
                    //     type: "Point",
                    //     coordinates: [
                    //         parseInt(internshipData[i].geometry[j][1]),
                    //         parseInt(internshipData[i].geometry[j][0]),
                    //         // parseInt(geometry[i][j][0]),
                    //         // parseInt(geometry[i][j][1]),
                        
                    //     ]
                    // },
                    geometry: geoData.body.features[0].geometry,
                    imagesURL: imagesURL[i][j],
                    reviews: internshipReview,
                    lastModified: new Date(fakerator.date.past(2, new Date(2024, 0, 6))),
                })
                // const author = User.findById(userData[random].id);
                // await author.updateOne({ $push: { post: camp._id } });
                // await author.save();
                await camp.save();
            } catch (error) {
                console.log(i,j);
                console.log(internshipData[i].location)
                console.log(internshipData[i].geometry)
                console.log(error);
                break
              
            }
        }
    }
}



seedDBInternship().then(() => {
        mongoose.connection.close();
})