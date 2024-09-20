const ProductModel = require('../schemas/product-create-schema');

async function resolveProductId(request, response, next) {
  const productId = request.params.productId;

  const productData = await ProductModel.findByPk(parseInt(productId));

  if (!productData) {
    console.error(`NO_PRODUCT_FOUND, productId: ${productId}`);
    return response.status(400).json({
      success: false,
      message: 'No product found for given ID',
    });
  }

  request.product = productData.toJSON();

  await next();
}

module.exports = { resolveProductId };
