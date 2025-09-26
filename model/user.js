const mongoose = require("../config/db");


const UserSignin = mongoose.Schema({
    fullname: String,
    email: String,
    password: String
});

const User = mongoose.model("User",UserSignin);

module.exports = User;