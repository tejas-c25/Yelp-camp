const express = require('express');
const router = express.Router({ mergeParams: true });

const Campground = require('../models/campground');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');


const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');

//controllers
const reviews = require('../controllers/reviews');

//review model
const review = require('../models/review');


//creates a review
router.post('/', validateReview, isLoggedIn, catchAsync(reviews.createReview))

//deletes a review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;

