const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // <-- Import DB Config
const carbonRoutes = require('./routes/carbonRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Console Request Logger
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        console.log(`[HTTP API] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} (${Date.now() - start}ms)`);
    });
    next();
});

// API Routes
app.use('/api/v1/carbon', carbonRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});