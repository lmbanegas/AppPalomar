const express = require('express');
const router = express.Router();
const calculoController = require('../controllers/calculoManualController');


const path = require('path');
const fs = require('fs');

router.get('/puam', calculoController.inicioPuam);
router.post('/puam', calculoController.calcularPuam);  

router.get('/pension', calculoController.inicioPension);
router.post('/pension', calculoController.calcularPension); 


router.get('/blog', function(req, res) {
    const filePath = path.join(__dirname, '../views/blog.json'); // Ruta al archivo JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const blogData = JSON.parse(data); // Parsea el contenido del archivo JSON
        res.render('blog', { blog: blogData }); // Pasa los datos del blog como parte del objeto de contexto
    });
});

module.exports = router;