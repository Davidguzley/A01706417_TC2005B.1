const express = require('express');
const router = express.Router();
const path = require('path');
const unidadesController = require('../controllers/unidades_controller');

//Para acceder a los recursos de la carpeta public
router.use(express.static(path.join(__dirname,'..', 'public')));

router.get('/nueva-unidad', unidadesController.getNuevaUnidad);

router.post('/nueva-unidad', unidadesController.postNuevaUnidad);

router.get('/', unidadesController.get);

module.exports = router;