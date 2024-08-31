const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/echo', (req, res) => {
  const { message } = req.body;
  res.json({ message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
