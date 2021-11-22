const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { campgroundSchema } = require('../schemas.js');

const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

//controllers
const campgrounds = require('../controllers/campgrounds');

//campground model -> where we create the db model
const Campground = require('../models/campground');

//isLoggedIn middleware -> checks if the person is logged in before modifying campgrounds
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware');


//All are self explanatory -> if you want to know more , check controller campgrounds file

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    

router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))



module.exports = router;