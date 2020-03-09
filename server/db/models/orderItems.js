const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = OrderItem;
