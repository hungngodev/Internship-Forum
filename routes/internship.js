const express = require('express');
const router = express.Router();
const internships = require('../controllers/internships');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateInternship,validateSearch } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
router.route('/')
    .get(catchAsync(internships.index))
    .post(isLoggedIn, upload.array('image'), validateInternship, catchAsync(internships.createInternship))

router.route('/search')
    .get(validateSearch, catchAsync(internships.search))

router.get('/new', isLoggedIn, internships.renderNewForm)

router.route('/:id')
    .get(catchAsync(internships.showInternship))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateInternship, catchAsync(internships.updateInternship))
    .delete(isLoggedIn, isAuthor, catchAsync(internships.deleteInternship));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(internships.renderEditForm))



module.exports = router;