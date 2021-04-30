const EVA = require('../models/EVA');
const filesystem = require('fs');

exports.getNuevaUnidad = (request, response, next) => {
    response.render('nuevaUnidad', {
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postNuevaUnidad = (request, response, next) => {
    console.log("Añadiendo nueva unidad...");
    console.log(request.body.NumUnidad);
    
    const image = request.file;
    console.log(image);

    if(!image) {
        console.error('Error al subir la imagen');
        return response.status(422).redirect('/');
    }

    var nueva_unidad = new EVA(request.body.NumUnidad, request.body.Children, request.body.Pais, image.filename);
    filesystem.appendFileSync('lab11y12.txt', nueva_unidad.toString() + '\n');
    nueva_unidad.save()
        .then(() => {
            response.setHeader('Set-Cookie', ['ultima_unidad='+nueva_unidad.toString()+'; HttpOnly']);
            response.redirect('/unidades');
        }).catch(err => console.log(err));

}

exports.getUnidad = (request, response, next) => {
    const num = request.params.unidad_num;
    EVA.fetchOne(num)
        .then(([rows, fieldData]) => {
            response.render('unidades', { 
                lista_EVAS: rows, 
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postBuscar = (request, response, next) => {
    console.log(request.body);
    console.log(request.body.valor_busqueda);
    const niño = request.body.valor_busqueda;
    EVA.fetchByName(niño)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.status(200).json(rows);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.get = (request, response, next) => {
    //Con cookie-parser
    console.log(request.cookies);

    EVA.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('unidades', {
                csrfToken: request.csrfToken(),
                lista_EVAS: rows, 
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        })
        .catch(err => {
            console.log(err);
        });
};