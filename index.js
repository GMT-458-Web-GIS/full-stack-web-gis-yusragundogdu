const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Merhaba! GMT 458 Web GIS Projesi Backend Calisiyor.');
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde calisiyor`);
});