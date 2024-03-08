const express = require('express');
const router = express.Router();
const pensionController = require('../controllers/pensionController');
const pensionControllerSinMinimo = require('../controllers/pensionControllerSinMinimo');

const puamController = require('../controllers/puamController');
const pncController = require('../controllers/pncController');
const actualizarhaberController = require('../controllers/actualizarhaberController');
const bonosController = require('../controllers/bonosController');

const pensionRetroController = require('../controllers/pensionRetroController');

const actualizarhaberControllerSinMinimo = require('../controllers/actualizarhaberControllerSinMinimo');

const path = require('path');
const fs = require('fs');

router.get('/aplicaciones', function(req, res) {
    res.render('calculosLMN');
});

router.get('/puam', puamController.inicioPuam);
router.post('/puam', puamController.calcularPuam);



router.get('/pension', pensionController.inicioPension);
router.post('/pension', pensionController.calcularPension);


router.get('/pension2', pensionControllerSinMinimo.inicioPension);
router.post('/pension2', pensionControllerSinMinimo.calcularPension);



router.get('/retro', pensionRetroController.inicioPension);
router.post('/retro', pensionRetroController.calcularPension);

router.get('/pnc', pncController.inicioPNC);
router.post('/pncResult', pncController.calcularPNC);


router.get('/actualizacionhaber', actualizarhaberController.inicioPension);
router.post('/actualizacionhaber', actualizarhaberController.calcularPension);

router.get('/actualizacionhaber2', actualizarhaberControllerSinMinimo.inicioPension);
router.post('/actualizacionhaber2', actualizarhaberControllerSinMinimo.calcularPension);


router.get('/bonos', bonosController.mostrarBonos);
router.post('/calcular', bonosController.calcularTotal);



module.exports = router;    
