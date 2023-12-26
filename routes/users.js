import express from 'express';
const userRoutes = express.Router();
import passport from 'passport';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/user.js';
import users from '../controllers/users.js';
import { validateSearch } from '../middleware.js';


userRoutes.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

userRoutes.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

userRoutes.get('/logout', users.logout)

userRoutes.get('/profile/:id', catchAsync(users.index))

userRoutes.get('/profile/:id/search',validateSearch, catchAsync(users.search))

export default userRoutes;