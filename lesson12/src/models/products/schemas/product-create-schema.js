const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../services/db');

const productCreationSchema = sequelize.define('productCreationSchema', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    productName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    productQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productDescription: {
        type: DataTypes.STRING(500),
        allowNull: true,
    }
}, {
    tableName: 'products',
    timestamps: true
})

module.exports = productCreationSchema;