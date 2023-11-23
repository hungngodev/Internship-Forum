const Internship = require('../models/internship');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const internships = await Internship.find({}).populate('popupText');
    res.render('internships/index', { internships })
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
    internship.geometry = geoData.body.features[0].geometry;
    internship.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    internship.author = req.user._id;
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
    console.log(req.body);
    const internship = await Internship.findByIdAndUpdate(id, { ...req.body.internship });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    internship.images.push(...imgs);
    await internship.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await internship.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated internship!');
    res.redirect(`/internships/${internship._id}`)
}

module.exports.deleteInternship = async (req, res) => {
    const { id } = req.params;
    await Internship.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted internship')
    res.redirect('/internships');
}