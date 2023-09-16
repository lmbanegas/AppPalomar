const express = require('express');
const app = express();
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index');
});

const puerto = process.env.PORT || 3000;

// Inicia el servidor en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor Express - puerto ${puerto}`);
});