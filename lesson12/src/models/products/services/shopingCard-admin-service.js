const joi = require('joi');
const shopingCardSchema = require('../schemas/shopping-card-schema');
const productSchema = require('../schemas/product-create-schema');

async function addProductByIdService(req, res) {
  const shopingCardCreationBodySchema = joi.object({
    quantity: joi.number().integer(),
  });

  const { error, value: requestBody } = shopingCardCreationBodySchema.validate(
    req.body,
  );

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  console.log(req.product);

  if (req.product.productQuantity < requestBody.quantity) {
    return res.status(400).json({
      success: false,
      message: 'Error, requested quantity exceeds available stock',
    });
  }

  const remainingQuantity = req.product.productQuantity - requestBody.quantity;

  // sequelize postgresql where
  const updatedProduct = await productSchema.update(
    { productQuantity: remainingQuantity },
    { where: { id: req.product.id } },
  );

  if (updatedProduct[0] === 0) {
    return res.status(400).json({
      success: false,
      message: 'Error, could not update product quantity',
    });
  }

  requestBody.productId = req.product.id;

  const newShopingCard = await shopingCardSchema.create(requestBody);

  if (!newShopingCard) {
    return res.status(400).json({
      success: false,
      message: 'Error, could not add new shopingCard to the database',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'new shopingCard has been added',
  });
}

async function getOneService(req, res) {
  return res.status(200).json({
    success: true,
    data: req.shopingCard,
  });
}

module.exports = {
  addProductByIdService,
  getOneService,
};
