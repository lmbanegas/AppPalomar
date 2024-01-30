const express = require('express');
const router = express.Router();
const supervisionesController = require('../controllers/supervisionesController');

// Rutas para supervisiones
router.get('/formulario', supervisionesController.mostrarFormulario);
router.get('/formularioRapido', supervisionesController.mostrarFormularioRapido);

router.post('/guardar', supervisionesController.guardarDatos);
router.get('/tabla', supervisionesController.mostrarTablaSupervisiones);

router.get('/cerradosDiaAnterior', supervisionesController.cerradosDiaAnterior);




router.get('/editar/:id', supervisionesController.mostrarFormularioEdicion);
router.post('/actualizar/:id', supervisionesController.actualizarSupervision);
router.get('/detalle/:id', supervisionesController.mostrarDetalleSupervision);


module.exports = router;

