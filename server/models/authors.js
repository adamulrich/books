const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: false },
    bioUrl: { type: String, required: false }
});

module.exports = mongoose.model('Author', authorSchema, 'authors');