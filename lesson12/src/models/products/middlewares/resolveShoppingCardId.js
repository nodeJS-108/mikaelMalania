const ShopingCardModel = require('../schemas/shopping-card-schema');

async function resolveShopingCardId(request, response, next) {
  const shopingCardId = request.params.shopingCardId;

  const shopingCardData = await ShopingCardModel.findByPk(
    parseInt(shopingCardId),
  );

  if (!shopingCardData) {
    console.error(`NO_SHOPING_CARD_FOUND, shopingCardId: ${shopingCardId}`);
    return response.status(400).json({
      success: false,
      message: 'No shopingCard found for given ID',
    });
  }

  request.shopingCard = shopingCardData.toJSON();

  await next();
}

module.exports = { resolveShopingCardId };
