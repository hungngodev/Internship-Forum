import mongoose from 'mongoose';

import Review from './review.js';


const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const InternshipSchema = new Schema({
    title: String,
    images: [ImageSchema],
    imagesURL: [String],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    salary: Number,
    description: String,
    company: String,
    link: String,
    area:String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    lastModified: {
        type: Date,
        default: Date.now
    }
}, opts);


InternshipSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/internships/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});



InternshipSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

InternshipSchema.index({'$**': 'text'});

export default mongoose.model('Internship', InternshipSchema);