require('dotenv').config();
const express = require('express');
const https = require('https'); // Adicionado
const fs = require('fs'); // Adicionado
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');

// Import routes module
const userRoutes = require('./routes/userRoutes');

// Import routes module
const countryRoutes = require('./routes/countryRoutes');

const app = express();
app.use(mongoSanitize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
app.use('/', userRoutes);

// Use the user routes module
app.use('/country', countryRoutes);

// Public Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'It works' });
});

// Configuração para o servidor HTTPS
const httpsOptions = {
    key: fs.readFileSync('private-key.pem'),
    cert: fs.readFileSync('cert.pem')
};
// Cria o servidor HTTPS
const server = https.createServer(httpsOptions, app);

// Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log(`Server is running on port 3000 (HTTPS)`);
});
