const express = require('express');
const router = express.Router();
const { mySongs, allMySongs, specSong, addSong, editSong, delSong } = require('../controllers/songController');

router.get('/mySongs/:id', mySongs);
router.get('/allMySongs', allMySongs);
router.get('/specSong/:id', specSong);
router.post('/addSong/:id', addSong);
router.put('/editSong/:id', editSong);
router.delete('/delSong/:id', delSong);


module.exports = router;