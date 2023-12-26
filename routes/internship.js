import express from 'express';
import multer from 'multer';

import internships from '../controllers/internships.js';
import catchAsync from '../utils/catchAsync.js';
import { isLoggedIn, isAuthor, validateInternship, validateSearch } from '../middleware.js';
import { storage } from '../cloudinary/index.js';


const internshipRoutes = express.Router();
const upload = multer({ storage });

internshipRoutes.route('/')
    .get(catchAsync(internships.index))
    .post(isLoggedIn, upload.array('image'), validateInternship, catchAsync(internships.createInternship))

internshipRoutes.route('/search')
    .get(validateSearch, catchAsync(internships.search))

internshipRoutes.get('/new', isLoggedIn, internships.renderNewForm)

internshipRoutes.route('/:id')
    .get(catchAsync(internships.showInternship))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateInternship, catchAsync(internships.updateInternship))
    .delete(isLoggedIn, isAuthor, catchAsync(internships.deleteInternship));

internshipRoutes.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(internships.renderEditForm))



export default internshipRoutes;