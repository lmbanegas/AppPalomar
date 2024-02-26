const express = require('express');
const router = express.Router();
const pensionController = require('../controllers/pensionController');
const puamController = require('../controllers/puamController');
const pncController = require('../controllers/pncController');

const pensionRetroController = require('../controllers/pensionRetroController');



const path = require('path');
const fs = require('fs');

router.get('/aplicaciones', function(req, res) {
    res.render('calculosLMN'); //
});

router.get('/puam', puamController.inicioPuam);
router.post('/puam', puamController.calcularPuam);



router.get('/pension', pensionController.inicioPension);
router.post('/pension', pensionController.calcularPension);

router.get('/retro', pensionRetroController.inicioPension);
router.post('/retro', pensionRetroController.calcularPension);

router.get('/pnc', pncController.inicioPNC);
router.post('/pncResult', pncController.calcularPNC);



module.exports = router;    
