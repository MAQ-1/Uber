const express = require('express');
const router = express.Router();

const {body}=require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Post route for user registration
router.post('/register',[
    body('Fullname.Firstname').isLength({ min: 3 }).withMessage('Firstname should be at least 3 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);


// Post route for user login
router.post('/Login',[
    body("email").isEmail().withMessage("Valid email is required"), 
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.loginuser);

// GET route for user profile
router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

// POST route for user logout
router.post('/logout',authMiddleware.authUser, userController.logoutUser);

module.exports = router;