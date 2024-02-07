const express = require('express');
const router = express.Router();
const calculoController = require('../controllers/calculoManualController');


const path = require('path');
const fs = require('fs');

router.get('/aplicaciones', function(req, res) {
    res.render('calculosLMN'); //
});

router.get('/puam', calculoController.inicioPuam);
router.post('/puam', calculoController.calcularPuam);

router.get('/pension', calculoController.inicioPension);
router.post('/pension', calculoController.calcularPension);



module.exports = router;    