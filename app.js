const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const moviesRoutes = require('./routes/movies');
dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = ['https://www.varmamovies.com', 'https://varmamovies.com', `http://localhost:3000`];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('Not allowed by CORS'), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.use('/movies', moviesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
