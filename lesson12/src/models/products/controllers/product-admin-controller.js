const express = require('express');
const productAdminRouter = express.Router();
const productAdminService = require('../services/product-admin-service.js');

const { resolveProductId } = require('../middlewares/resolveProductId.js');

productAdminRouter.param('productId', resolveProductId);

productAdminRouter.post('/create', productAdminService.createService);
// getAll products
productAdminRouter.get('/getAll', productAdminService.getAllProductsService);
// getOne product??
productAdminRouter.get(
  '/getOne/:productId',
  productAdminService.getProductByIdService,
);
// update product
productAdminRouter.patch(
  '/update/:productId',
  productAdminService.updateProductService,
);
// delete product
productAdminRouter.delete(
  '/delete/:productId',
  productAdminService.deleteProductService,
);

module.exports = productAdminRouter;
