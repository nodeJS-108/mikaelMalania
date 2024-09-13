module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING(100)
    },
    price: {
      type: Sequelize.STRING(100)
    },
    isDeleted: {
      type: Sequelize.BOOLEAN
    }
  });
  return Product;
};
