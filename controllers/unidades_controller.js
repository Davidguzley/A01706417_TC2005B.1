const EVA = require('../models/EVA');
const filesystem = require('fs');

exports.getNuevaUnidad = (request, response, next) => {
    response.render('nuevaUnidad');
};

exports.postNuevaUnidad = (request, response, next) => {
    console.log(request.body.nombre);
    console.log(request.body.children);
    console.log(request.body.pais);
    var nueva_unidad = new EVA(request.body.nombre, request.body.children, request.body.pais, "media/evaNuevo.jpg");
    filesystem.appendFileSync('lab11y12.txt', nueva_unidad.toString() + '\n');
    nueva_unidad.save();
    response.redirect('/unidades');
}

exports.get = (request, response, next) => {
    const EVAS = EVA.fetchAll();
    response.render('unidades', {lista_EVAS: EVAS});
};