const express = require('express');
const path = require('path');
const puerto = process.env.PORT || 3000;


const app = express();
app.use(express.static('public'));
const publicPath = path.join(__dirname,'public');

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index');
});


app.get('/afip', (req, res) => {
  res.render('afip');
});


// Inicia el servidor en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor Express - puerto ${puerto}`);
});