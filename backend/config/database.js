require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? undefined : '../.env' }); // Modifica questa linea

const { Sequelize } = require('sequelize');

// Aggiungi controllo di sicurezza
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL non definito! Controlla le variabili d\'ambiente');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: process.env.NODE_ENV === 'production' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

module.exports = sequelize;