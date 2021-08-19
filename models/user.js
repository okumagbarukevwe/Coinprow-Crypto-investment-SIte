var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    usdtAdd : String,
    busdAdd: String,
    usdcAdd: String,
    accBalance: Number,
    usdcDetails: {
        addedAmount: Number,
        referral: Number,
        withdrawal: Number,
        pending: Number
    },
    busdDetails: {
        addedAmount: Number,
        referral: Number,
        withdrawal: Number,
        pending: Number
    },
    usdtDetails: {
        addedAmount: Number,
        referral: Number,
        withdrawal: Number,
        pending: Number
    }
    
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', userSchema);