const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const apiRouter = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connessione DB
sequelize.sync({ alter: true }).then(() => {
  console.log('🗄️  Database connected!');
}).catch(err => {
  console.error('❌ Database connection error:', err);
});

// Routes API
app.use('/api', apiRouter);

// Servizio Statico per React in produzione
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});