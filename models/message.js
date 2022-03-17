let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let messageSchema = new Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model("Message", messageSchema);