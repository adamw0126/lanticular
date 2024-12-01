const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = require('./routes');
const port = 5000;
const path = require('path');

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/lanticular')
mongoose.connect('mongodb+srv://kellanrowan179:QqOm2f4roaB9RRUw@cluster0.agtt7.mongodb.net/lanticular')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(cors());

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(express.json()); // Parses incoming JSON requests

app.use('/', router);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(express.static(path.join(__dirname, '..', 'dist')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
