const Sequelize = require('sequelize')
const db = require('../db')

const Donut = db.define('donut', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "It's a donut. What more do you need to know?"
  },
  price: {
    type: Sequelize.FLOAT(4, 2),
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
})

module.exports = Donut
