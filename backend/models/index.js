const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Yarn = sequelize.define('Yarn', {
  name: { type: DataTypes.STRING, allowNull: false },
  color: DataTypes.STRING,
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  costPerUnit: { type: DataTypes.FLOAT, defaultValue: 0 },
  supplier: DataTypes.STRING,
  minStock: { type: DataTypes.INTEGER, defaultValue: 10 }
});

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
  status: { type: DataTypes.STRING, defaultValue: 'in_production' }
});

const Sale = sequelize.define('Sale', {
  customerName: DataTypes.STRING,
  customerEmail: DataTypes.STRING,
  totalAmount: DataTypes.FLOAT,
  paymentMethod: DataTypes.STRING
});

// Relazioni
Product.hasMany(Sale);
Sale.belongsTo(Product);

// Hook per alert scorte
Yarn.addHook('afterSave', async (yarn) => {
  if (yarn.quantity < yarn.minStock) {
    console.log(`⚠️ Low stock alert for ${yarn.name}! Current: ${yarn.quantity}`);
  }
});

module.exports = { Yarn, Product, Sale };