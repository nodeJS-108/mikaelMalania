const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const port = process.env.PORT;

const productAdminController = require('./models/products/controllers/product-admin-controller');
const shopingCardAdminController = require('./models/products/controllers/shoping-card-admin-controller.js');

const bodyParser = require('body-parser');

const run = async () => {
  const app = express();

  app.use(bodyParser.json());

  app.use('/v1/product/', productAdminController);
  app.use('/v1/shopping_card/', shopingCardAdminController);

  app.listen(port, () => {
    console.log('Server is listening at http://localhost:3000');
  });
};

module.exports = {
  run,
};
