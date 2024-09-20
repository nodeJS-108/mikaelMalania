// shopping card schema
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/db');

const ShoppingCardSchema = sequelize.define(
  'ShoppingCardSchema',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'shopping_cards',
    timestamps: true,
  },
);

module.exports = ShoppingCardSchema;
