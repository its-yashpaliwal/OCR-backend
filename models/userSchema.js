const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    identificationNumber : {
        type: String,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    DOB : {
        type: String,
        required: true
    },
    issueDate : {
        type: String,
        required: true
    },
    expireDate : {
        type: String,
        required: true
    }
})

const User = mongoose.model('USER',userSchema);

module.exports = User; 