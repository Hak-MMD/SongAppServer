const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    note: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true,
    },

    albumImage: {
        type: String,
        required: true
    },

    listenerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
}, {
    timestamps: true
});

const AlbumModel = new mongoose.model('albums', AlbumSchema);
module.exports = AlbumModel;