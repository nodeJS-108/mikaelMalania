const express = require('express');
const shopingCardAdminRouter = express.Router();
const shopingCardAdminService = require('../services/shopingCard-admin-service.js');

const { resolveProductId } = require('../middlewares/resolveProductId.js');
const {
  resolveShopingCardId,
} = require('../middlewares/resolveShoppingCardId.js');

shopingCardAdminRouter.param('productId', resolveProductId);
shopingCardAdminRouter.param('shopingCardId', resolveShopingCardId);

shopingCardAdminRouter.post(
  '/addProductById/:productId',
  shopingCardAdminService.addProductByIdService,
);

shopingCardAdminRouter.get(
  '/getOne/:shopingCardId',
  shopingCardAdminService.getOneService,
);

module.exports = shopingCardAdminRouter;
