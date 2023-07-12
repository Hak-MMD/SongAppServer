const express = require('express');
const router = express.Router();
const { myAlbums, specAlbum, createAlbum, editAlbum, delAlbum } = require('../controllers/albumController');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../client/public/uploads")
    },

    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/myAlbums', myAlbums);
router.get('/specAlbum/:id', specAlbum);
router.post('/createAlbum', upload.single("albumImage"), createAlbum);
router.put('/editAlbum/:id', upload.single("albumImageName"), editAlbum);
router.delete('/delAlbum/:id', delAlbum);


module.exports = router;