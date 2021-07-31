var mongoose = require('mongoose');

var addFundSchema = new mongoose.Schema({
    amount: Number,
    crypto: String,
    created: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('addFund', addFundSchema);