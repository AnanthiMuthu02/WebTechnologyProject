
const nodemailer = require('nodemailer');

const sendOTPEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        text: `Your OTP for email verification is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };