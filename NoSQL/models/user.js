const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    content: String
})

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    popularity: Number,
    posts: [PostSchema]
});

module.exports = mongoose.model('User', UserSchema);