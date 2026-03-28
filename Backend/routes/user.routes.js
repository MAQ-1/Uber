const express = require('express');
const router = express.Router();

const {body}=require("express-validator");
const userController = require('../controllers/user.controller');


router.post('/register',[
    body('Fullname.Firstname').isLength({ min: 3 }).withMessage('Firstname should be at least 3 characters long'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);





module.exports = router;