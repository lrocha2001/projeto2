require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import user routes module
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to the database
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.xfqdxjl.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Successful Database Connection');
    })
    .catch((error) => {
        console.log('Error Database Connection: ' + error);
    });

// Use the user routes module
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'It works'});
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});