const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyOTP } = require('../controllers/userController');

router.post('/register', registerUser);  
router.post('/verifyotp', verifyOTP);  
router.post('/login', loginUser);        

module.exports = router;