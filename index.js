const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const albumRoutes = require('./routes/albumRoutes');
const { protect } = require('./middleware/authMiddleware');



app.use(cors());
app.use(express.json({ extended: true }));

app.use('/api/auth', userRoutes);
app.use('/api/song', protect, songRoutes);
app.use('/api/album', protect, albumRoutes);
mongoose.set('strictQuery', true);


const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;


const start = async () => {
    try {
        await mongoose.connect(MONGO_URL);

        app.listen(PORT, () => {
            console.log('App is running... PORT: ', PORT);
            console.log('DB connected...');
        });
    } catch (error) {
        console.log(error);
    }
}

start();