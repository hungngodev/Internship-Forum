import express from 'express';

import { validateReview, isLoggedIn, isReviewAuthor } from '../middleware.js';
import Internship from '../models/internship.js';
import Review from '../models/review.js';
import reviews from '../controllers/reviews.js';
import ExpressError from '../utils/ExpressError.js';
import catchAsync from '../utils/catchAsync.js';


const reviewRoutes = express.Router({ mergeParams: true });

reviewRoutes.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

reviewRoutes.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

export default reviewRoutes;