const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    is_verified: {type: Boolean, default: false},
    otp: {type: String},
    otpExpiry: {type: Date}
})

module.exports = model('User', userSchema)