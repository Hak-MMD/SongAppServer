const AlbumModel = require('../models/Album');
const UserModel = require('../models/User');
const SongModel = require('../models/Song');



const myAlbums = async (req, res) => {
    try {
        const allMyAlbums = await AlbumModel.find({ listenerId: req.user.id });
        res.status(200).json(allMyAlbums);
    } catch (error) {
        return res.status(500).json({ message: `Error myQuest: ${error}` });
    }
};

const specAlbum = async (req, res) => {
    try {
        const id = req.params.id;
        const album = await AlbumModel.findById(id);
        res.status(200).json(album);
    } catch (error) {
        return res.status(500).json({ message: `Error specQuest: ${error}` });
    }
};

const createAlbum = async (req, res) => {
    try {
        if (!req.body.name || !req.body.note || !req.body.genre) {
            return res.status(400).json({ message: `Please provide all values!` });
        }

        const newAlbum = await AlbumModel.create({
            name: req.body.name,
            note: req.body.note,
            genre: req.body.genre,
            albumImage: req.file.originalname,
            listenerId: req.user.id,
        });

        res.status(201).json(newAlbum);
    } catch (error) {
        return res.status(500).json({ message: `Error ask: ${error}` });
    }
}

const editAlbum = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log('upd', req.params.id);

        const album = await AlbumModel.findById(id);

        if (!album) {
            return res.status(400).json({ message: `No album found!` });
        }

        const user = await UserModel.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: `No user found!` });
        }

        if (album.listenerId.toString() !== user.id) {
            return res.status(401).json({ message: `User not authorized!` });
        };

        if (!req.body.name || !req.body.note || !req.body.genre) {
            return res.status(400).json({ message: `Please provide all values!` });
        };
        const updateAlbum = await AlbumModel.findByIdAndUpdate(id, {
            name: req.body.name,
            note: req.body.note,
            genre: req.body.genre,
            albumImage: req.file.originalname,
            listenerId: req.user.id,
        }, { new: true });

        res.status(200).json(updateAlbum);

    } catch (error) {
        return res.status(500).json({ message: `Error update: ${error}` });
    }
};
const delAlbum = async (req, res) => {
    try {
        const id = req.params.id;
        const album = await AlbumModel.findById(id);

        if (!album) {
            return res.status(400).json({ message: `No album found!` });
        };

        const user = await UserModel.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: `No user found!` });
        };

        if (album.listenerId.toString() !== user.id) {
            return res.status(401).json({ message: `User not authorized!` });
        };

        await AlbumModel.findByIdAndDelete(id);


        await SongModel.deleteMany({ albumId: id });
        res.status(200).json({ id })
    } catch (error) {
        return res.status(500).json({ message: `Error delete: ${error}` });
    }
};


module.exports = {
    myAlbums,
    specAlbum,
    createAlbum,
    editAlbum,
    delAlbum
};