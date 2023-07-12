const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    listenerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'albums',
        required: true
    }
}, {
    timestamps: true
});

const SongModel = new mongoose.model('songs', SongSchema);
module.exports = SongModel;