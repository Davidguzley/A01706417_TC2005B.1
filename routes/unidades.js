const express = require('express');
const router = express.Router();
const filesystem = require('fs');

class EVA{
    constructor(nombre, children, pais){
        this.nombre = nombre;
        this.children = children;
        this.pais = pais;
    }

    toString(){
        return (`Unidad EVA ${this.nombre} pilotada por ${this.children} de ${this.pais}.`);
    }
}

const unidad1 = new EVA("00", "Rei Ayanami", "Japón");
const unidad2 = new EVA("01", "Shinji Ikari", "Japón");
const unidad3 = new EVA("02", "Asuka Langley", "Alemania");
const EVAS = [unidad1, unidad2, unidad3];

router.get('/nueva-unidad', (request, response, next) => {
    response.send('<h1>Asigna una nueva unidad Evangelion</h1><form action="nueva-unidad" method="POST"> <input type="text" name="nombre" placeholder="Numero de EVA"> <br><input type="text" name="children" placeholder="Nombre del niño elegido"> <br><input type="text" name="pais" placeholder="Pais de origen del niño"> <br> <input type="submit" value="Guardar EVA"></form>'); 
});

router.post('/nueva-unidad', (request, response, next) => {
    console.log(request.body.nombre);
    console.log(request.body.children);
    console.log(request.body.pais);
    var nueva_unidad = new EVA(request.body.nombre, request.body.children, request.body.pais);
    filesystem.writeFileSync('lab11.txt', nueva_unidad.toString());
    EVAS.push(nueva_unidad);
    response.redirect('/unidades');
});

router.use('/', (request, response, next) => {
    let html = '<h1>UNIDADES</h1><ul>';
    for (let EVA of EVAS) {
        html = html + '<li>' + EVA.toString() + '</li>';
    }
    html = html + '</ul>'
    response.send(html); 
});

module.exports = router;