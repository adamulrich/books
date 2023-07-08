const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: false },
    year: { type: Number, required: false},
    series: { type: String, required: false },
    imageUrl: { type: String, required: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author'}
});

module.exports = mongoose.model('Book', bookSchema, 'books');