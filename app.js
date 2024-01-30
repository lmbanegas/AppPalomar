const express = require('express');
const path = require('path');
const blog = require('./views/blog.json'); 
const fs = require('fs');
const { Pool } = require('pg');
const supervisionesRoutes = require('./routes/supervisionesRoutes');
const calculoManualRoutes = require('./routes/calculoManualRoutes'); 

// ------- ***** RENDER ***** ------- /

// const pool = new Pool({
//   connectionString: 'postgres://datos_nf4r_user:F0UCioJs60QYobtLbDY7Xded7VkhYRYy@dpg-cl24k68p2gis7381s7bg-a/datos_nf4r',
// });

// ------- ***** RENDER ***** ------- /



// ------- ***** VS ***** ------- /

const pool = new Pool({
  connectionString: 'postgres://datos_nf4r_user:F0UCioJs60QYobtLbDY7Xded7VkhYRYy@dpg-cl24k68p2gis7381s7bg-a.oregon-postgres.render.com/datos_nf4r',
  ssl: true,
});

// ------- ***** VS ***** ------- /







const puerto = process.env.PORT || 3000;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/partials'),

]);

// Configura el motor de vistas y la ubicación de archivos estáticos
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Configura express.json() y express.urlencoded() para analizar datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', calculoManualRoutes);
app.use('/supervisiones', supervisionesRoutes);




// Inicia el servidor en el puerto especificado
app.listen(puerto, () => {
  console.log(`Servidor Express - puerto ${puerto}`);
});
