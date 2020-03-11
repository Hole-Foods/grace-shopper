const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  receiptUrl: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  chargeId: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = Order;
