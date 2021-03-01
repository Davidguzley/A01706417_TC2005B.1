const express = require('express');
const router = express.Router();
const filesystem = require('fs');
const path = require('path');
//const unidadesController = require('../controllers/unidades_controller');

class EVA{
    constructor(nombre, children, pais, imagen){
        this.nombre = nombre;
        this.children = children;
        this.pais = pais;
        this.imagen = imagen;
    }

    toString(){
        return (`Unidad EVA ${this.nombre} pilotada por ${this.children} de ${this.pais}.`);
    }

    mostrar(){
        return (`${this.imagen}`);
    }
}

const unidad1 = new EVA("00", "Rei Ayanami", "Japón", "eva00.png");
const unidad2 = new EVA("01", "Shinji Ikari", "Japón", "eva01.gif");
const unidad3 = new EVA("02", "Asuka Langley", "Alemania", "eva02.png");
const EVAS = [unidad1, unidad2, unidad3];

//Para acceder a los recursos de la carpeta public
router.use(express.static(path.join(__dirname,'..', 'public')));

router.get('/nueva-unidad', (request, response, next) => {
    response.render('nuevaUnidad'); 
});

router.post('/nueva-unidad', (request, response, next) => {
    console.log(request.body.nombre);
    console.log(request.body.children);
    console.log(request.body.pais);
    var nueva_unidad = new EVA(request.body.nombre, request.body.children, request.body.pais, "evaNuevo.jpg");
    filesystem.writeFileSync('lab11y12.txt', nueva_unidad.toString());
    EVAS.push(nueva_unidad);
    response.redirect('/unidades');
});

router.use('/', (request, response, next) => {
    response.render('unidades', {lista_EVAS: EVAS});
});

module.exports = router;