const express = require('express');
const path = require('path');
const blog = require('./views/otros/blog.json'); 
const fs = require('fs');
const { Pool } = require('pg');
const supervisionesRoutes = require('./routes/supervisionesRoutes');
const calculoManualRoutes = require('./routes/calculoManualRoutes'); 
const resolucionesRoutes = require('./routes/resolucionesRoutes'); 
const formulariosRoutes = require('./routes/formulariosRoutes'); 
const generalRoutes = require('./routes/generalRoutes'); 



// ------- ***** RENDER ***** ------- /

const pool = new Pool({
  connectionString: 'postgres://datos_nf4r_user:F0UCioJs60QYobtLbDY7Xded7VkhYRYy@dpg-cl24k68p2gis7381s7bg-a/datos_nf4r',
});

// ------- ***** RENDER ***** ------- /



// ------- ***** VS ***** ------- /

// const pool = new Pool({
//   connectionString: 'postgres://datos_nf4r_user:F0UCioJs60QYobtLbDY7Xded7VkhYRYy@dpg-cl24k68p2gis7381s7bg-a.oregon-postgres.render.com/datos_nf4r',
//   ssl: true,
// });

// ------- ***** VS ***** ------- /



const puerto = process.env.PORT || 3000;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/partials'),
    path.join(__dirname, './views/lmn'),
    path.join(__dirname, './views/resoluciones'),
    path.join(__dirname, './views/formularios'),
    path.join(__dirname, './views/otros'),
    path.join(__dirname, './views/supervisiones'),

]);

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/lmn', calculoManualRoutes);
app.use('/supervisiones', supervisionesRoutes);
app.use('/resoluciones', resolucionesRoutes);
app.use('/formularios', formulariosRoutes);
app.use('/general', generalRoutes);





// Servidor
app.listen(puerto, () => {
  console.log(`Servidor Express - puerto ${puerto}`);
});
