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

// Middleware
app.use(cors()); // Enables CORS
// app.use(cors({
//     origin: 'http://localhost:5000', // Or the origin of your frontend
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }));

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(express.json()); // Parses incoming JSON requests

// Mount the router on the '/' path
app.use('/', router);

// Serve uploaded files (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
