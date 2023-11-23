const Internship = require('../models/internship');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const internship = await Internship.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    internship.reviews.push(review);
    await review.save();
    await internship.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/internships/${internship._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Internship.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/internships/${id}`);
}
