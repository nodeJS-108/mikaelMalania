const joi = require('joi');
const productSchema = require('../schemas/product-create-schema');

async function createService(req, res) {
  const productCreationBodySchema = joi.object({
    productName: joi.string().max(50).required(),
    productQuantity: joi.number().integer(),
    productDescription: joi.string().max(500).optional(),
  });

  const { error, value: requestBody } = productCreationBodySchema.validate(
    req.body,
  );

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const newProduct = await productSchema.create(requestBody);

  if (!newProduct) {
    return res.status(400).json({
      success: false,
      message: 'Error, could not add new product to the database',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'new product has been added',
  });
}

async function getAllProductsService(req, res) {
  const products = await productSchema.findAll();

  return res.status(200).json({
    success: true,
    data: products,
  });
}

async function getProductByIdService(req, res) {
  return res.status(200).json({
    success: true,
    data: req.product,
  });
}

async function updateProductService(req, res) {
  const updateProductSchema = joi.object({
    productName: joi.string().max(50).optional(),
    productQuantity: joi.number().integer().optional(),
    productDescription: joi.string().max(500).optional(),
  });

  const { error, value: requestBody } = updateProductSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  const updatedProduct = await productSchema.update(requestBody, {
    where: { id: req.product.id },
  });

  if (updatedProduct[0] === 0) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Product has been updated',
  });
}

async function deleteProductService(req, res) {
  const deletedProduct = await productSchema.destroy({
    where: { id: req.product.id },
  });

  if (deletedProduct === 0) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Product has been deleted',
  });
}

module.exports = {
  createService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
};
