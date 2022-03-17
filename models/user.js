let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    member: {type: Boolean, default: false},
    admin: {type: Boolean, default: false}
});

module.exports = mongoose.model("User", userSchema);