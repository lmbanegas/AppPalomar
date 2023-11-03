const express = require('express');
const path = require('path');
const blog = require('./views/blog.json'); 
const fs = require('fs');


const puerto = process.env.PORT || 3000;

const app = express();

// Configura el motor de vistas y la ubicación de archivos estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configura express.json() y express.urlencoded() para analizar datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/afip', (req, res) => {
  res.render('afip');
});

app.get('/blog', (req, res) => {
  res.render('blog', { blog });
});

app.get('/blog/newarticle', (req, res) => {
  res.render('newarticle');
});

app.post('/blog/newarticle', (req, res) => {
  // Buscamos contenido de JSON
  const blog = './views/blog.json'; 
  const jsonData = fs.readFileSync(blog, 'utf-8');
  //Pasamos el JSON a JS
  const articulos = JSON.parse(jsonData);

console.log(jsonData)

  //Obtener hora y fecha
  const fechaActual = new Date();
  const formattedDate = fechaActual.toISOString().split('T')[0]; // Obtiene la fecha sin la hora
  
  const nuevoArticulo = {
    title: req.body.title,
    text: req.body.text,
    date: formattedDate
  };

  try {
    articulos.push(nuevoArticulo);
    const blogActualizado = JSON.stringify(articulos);
    fs.writeFileSync(blog, blogActualizado, 'utf-8');
    res.redirect('/blog');
  } catch (error) {
    console.error("Error al escribir el archivo JSON:", error);
    res.status(500).send("Error al actualizar el archivo JSON");
  }

});

// Inicia el servidor en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor Express - puerto ${puerto}`);
});
