
const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxAuthorId: { type: Number, required: true },
    maxBookId: { type: Number, required: true },
});

module.exports = mongoose.model('Sequence', sequenceSchema, 'sequence');