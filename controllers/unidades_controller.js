const EVA = require('../models/EVA');
const filesystem = require('fs');

exports.getNuevaUnidad = (request, response, next) => {
    response.render('nuevaUnidad', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
};

exports.postNuevaUnidad = (request, response, next) => {
    var nueva_unidad = new EVA(request.body.NumUnidad, request.body.Children, request.body.Pais, "media/evaNuevo.jpg");
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

exports.get = (request, response, next) => {
    //Con cookie-parser
    console.log(request.cookies);
    console.log(request.cookies.ultima_unidad);

    EVA.fetchAll()
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