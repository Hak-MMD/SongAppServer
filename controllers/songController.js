const SongModel = require('../models/Song');
const UserModel = require('../models/User');


const mySongs = async (req, res) => {
    try {
        const allMySongs = await SongModel.find({ listenerId: req.user._id, albumId: req.params.id });

        res.status(200).json(allMySongs);
    } catch (error) {
        return res.status(500).json({ message: `Error mySongs: ${error}` });
    }
};

const allMySongs = async (req, res) => {
    try {
        const allMySongs = await SongModel.find({ listenerId: req.user._id });

        res.status(200).json(allMySongs);
    } catch (error) {
        return res.status(500).json({ message: `Error allMySongs: ${error}` });
    }
};

const specSong = async (req, res) => {
    try {

        const id = req.params.id;
        const song = await SongModel.findById(id);

        res.status(200).json(song);
    } catch (error) {
        return res.status(500).json({ message: `Error specSong: ${error}` });
    }
};

const addSong = async (req, res) => {
    try {
        if (!req.body.name || !req.body.author || !req.body.year || !req.body.address) {
            return res.status(400).json({ message: `Please provide all values!` });
        }

        const newSong = await SongModel.create({
            name: req.body.name,
            author: req.body.author,
            year: req.body.year,
            address: req.body.address,
            listenerId: req.user.id,
            albumId: req.params.id,
        });

        res.status(201).json(newSong);
    } catch (error) {
        return res.status(500).json({ message: `Error ask: ${error}` });
    }
}


const editSong = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log('upd', req.params.id);

        const song = await SongModel.findById(id);

        if (!song) {
            return res.status(400).json({ message: `No song found!` });
        }

        const user = await UserModel.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: `No user found!` });
        }

        if (song.listenerId.toString() !== user.id) {
            return res.status(401).json({ message: `User not authorized!` });
        };

        if (!req.body.name || !req.body.author || !req.body.year || !req.body.address) {
            return res.status(400).json({ message: `Please provide all values!` });
        };
        const updateSong = await SongModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(updateSong);

    } catch (error) {
        return res.status(500).json({ message: `Error update: ${error}` });
    }
};
const delSong = async (req, res) => {
    try {
        const id = req.params.id;
        const song = await SongModel.findById(id);

        if (!song) {
            return res.status(400).json({ message: `No song found!` });
        };

        const user = await UserModel.findById(req.user.id);

        if (!user) {
            return res.status(401).json({ message: `No user found!` });
        };

        if (song.listenerId.toString() !== user.id) {
            return res.status(401).json({ message: `User not authorized!` });
        };

        await SongModel.findByIdAndDelete(id);
        res.status(200).json({ id })
    } catch (error) {
        return res.status(500).json({ message: `Error delete: ${error}` });
    }
};


module.exports = {
    mySongs,
    allMySongs,
    specSong,
    addSong,
    editSong,
    delSong
};