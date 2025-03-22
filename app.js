const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hotel booking API работает!');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});

const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB подключена'))
    .catch((err) => console.error(err));

const Booking = require('./models/Booking');

app.post('/api/bookings', async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
});

app.get('/api/bookings', async (req, res) => {
    const bookings = await Booking.find();
    res.json(bookings);
});
