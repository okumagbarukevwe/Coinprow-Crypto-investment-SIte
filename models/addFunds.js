var mongoose = require('mongoose');
let date = new Date();

var addFundSchema = new mongoose.Schema({
    amount: Number,
    crypto: String,
    operation: String,
    coinName: String,
    status: String,
    created: {type: Date, default: date.toLocaleString('en-US')},
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