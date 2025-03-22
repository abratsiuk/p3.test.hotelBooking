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

// создать новое бронирование
app.post('/api/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// получить все бронирования
app.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
