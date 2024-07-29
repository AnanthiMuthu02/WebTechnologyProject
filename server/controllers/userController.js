const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const HttpError = require('../models/errorModel')
const { sendOTPEmail } = require('../utils/emailService');

const registerUser = async (req, res, next) => {
  try {
      const { name, email, password, password2 } = req.body;
      if (!name || !email || !password || !password2) {
          return next(new HttpError("Fill in all the fields", 422));
      }
      const newEmail = email.toLowerCase();
      
      let user = await User.findOne({ email: newEmail });
      
      if (user) {
          if (user.is_verified) {
              return next(new HttpError("Email already exists", 422));
          } else {
              // User exists but not verified, update info and send new OTP
              const salt = await bcrypt.genSalt(10);
              const hashedPass = await bcrypt.hash(password, salt);
              
              const otp = Math.floor(100000 + Math.random() * 900000).toString();
              const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
              
              user.name = name;
              user.password = hashedPass;
              user.otp = otp;
              user.otpExpiry = otpExpiry;
              await user.save();
              
              await sendOTPEmail(newEmail, otp);
              
              return res.status(200).json({
                  status_code: 200,
                  message: "User information updated and new OTP sent. Please verify your account.",
                  user: {
                      id: user._id,
                      name: user.name,
                      email: user.email,
                      is_verified: user.is_verified
                  }
              });
          }
      }
      
      if (password.trim().length < 6) {
          return next(new HttpError("Password should be at least 6 characters", 422));
      }
      if (password !== password2) {
          return next(new HttpError("Passwords do not match", 422));
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);
      
      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
      
      // Create new user
      const newUser = await User.create({
          name,
          email: newEmail,
          password: hashedPass,
          is_verified: false,
          otp,
          otpExpiry
      });
      
      // Send OTP to user's email
      await sendOTPEmail(newEmail, otp);
      
      res.status(201).json({
          status_code: 201,
          message: "User registered successfully. Please check your email to verify your account.",
          user: {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              is_verified: newUser.is_verified
          }
      });
  } catch (error) {
      return next(new HttpError("User Registration Failed", 422));
  }
};

  const verifyOTP = async (req, res, next) => {
    try {
          const { email, otp } = req.body;

          const user = await User.findOne({ email });

          if (!user) {
              return next(new HttpError("User not found", 404));
          }

          if (user.is_verified) {
              return next(new HttpError("User already verified", 400));
          }

          if (user.otp !== otp) {
              return next(new HttpError("Invalid or expired OTP", 400));
          }

          user.is_verified = true;
          user.otp = undefined;
          user.otpExpiry = undefined;
          await user.save();

          res.status(200).json({
              message: "Email verified successfully"
          });
      } catch (error) {
          return next(new HttpError("OTP Verification Failed", 500));
      }
  };


  const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return next(new HttpError("Fill in all the fields", 422));
        }
        
        const newEmail = email.toLowerCase();
        
        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return next(new HttpError("Invalid Credentials", 422));
        }
        
        if (!user.is_verified) {
            return next(new HttpError("Please verify your email before logging in", 403));
        }
        
        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(new HttpError("Invalid Credentials", 422));
        }
        
        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.status(200).json({
            status_code: 200,
            message: "Login successful",
            token,
            user: {
                id,
                name,
                email: user.email
            }
        });
    } catch (error) {
        return next(new HttpError("Login failed. Please check your credentials", 422));
    }
};

module.exports = {registerUser, verifyOTP, loginUser}