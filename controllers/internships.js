const Internship = require('../models/internship');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");
const searchingForImageAI = require('../BING/images');



module.exports.index = async (req, res) => {
    const internships = await Internship.find({}).sort({lastModified:-1}).populate('popupText').populate('reviews');
    res.render('internships/index', { data: { internships: internships, mapBoxToken:mapBoxToken} })

}


module.exports.search = async (req, res) => {
    const query = req.query.q;
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
    const internships = await Internship.find({ $text: { $search: query } })
        .sort({lastModified:1})
        .populate('popupText').populate('reviews');
    let message = internships.length>0?`Search results for "${query}"`:`No results for "${query}"`;
    res.render('internships/index', { data: { internships: internships ,message:message,mapBoxToken:mapBoxToken} })

}

module.exports.renderNewForm = (req, res) => {
    res.render('internships/new');
}

module.exports.createInternship = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.internship.location,
        limit: 1
    }).send()
    const internship = new Internship(req.body.internship);
    // const user = User.findById(req.user._id);
    internship.geometry = geoData.body.features[0].geometry;
    internship.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    internship.author = req.user._id;
    internship.lastModified = new Date();
    if (req.body.generate == "yes") {
        AI = await searchingForImageAI(internship.company, internship.location);
        internship.imagesURL.push(...AI);
    }
    // user.post.push(internship);
    // await user.save();
    await internship.save();
    req.flash('success', 'Successfully made a new internship!');
    res.redirect(`/internships/${internship._id}`)
}

module.exports.showInternship = async (req, res,) => {
    const internship = await Internship.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!internship) {
        req.flash('error', 'Cannot find that internship!');
        return res.redirect('/internships');
    }
    res.render('internships/show', { internship });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const internship = await Internship.findById(id)
    if (!internship) {
        req.flash('error', 'Cannot find that internship!');
        return res.redirect('/internships');
    }
    res.render('internships/edit', { internship });
}

module.exports.updateInternship = async (req, res) => {
    const { id } = req.params;
    const internship = await Internship.findByIdAndUpdate(id, { ...req.body.internship });
    internship.lastModified = new Date();
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    internship.images.push(...imgs);
    await internship.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await internship.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    if (req.body.deleteImagesURL) {
        await internship.updateOne({ $pull: { imagesURL: { $in: req.body.deleteImagesURL } } })
    }
    req.flash('success', 'Successfully updated internship!');
    res.redirect(`/internships/${internship._id}`)
}

module.exports.deleteInternship = async (req, res) => {
    const { id } = req.params;
    // const internship = await Internship.findById(req.params.id).populate({
    //     path: 'reviews',
    //     populate: {
    //         path: 'author'
    //     }
    // }).populate('author');
    // const author = User.findById(internship.author._id);
    // await author.updateOne({ $pull: { post: internship._id } });
    // for (let review of internship.reviews) {
    //     const authorReview = User.findById(review.author._id);
    //     await authorReview.updateOne({ $pull: { reviews: review._id } });
    //     await Review.findByIdAndDelete(review._id);
    // }
    const internship = await Internship.findById(id);
    const images = internship.images.map(i => i.filename);
    for (let filename of images) {
        await cloudinary.uploader.destroy(filename);
    }
    await Internship.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted internship')
    res.redirect('/internships');
}