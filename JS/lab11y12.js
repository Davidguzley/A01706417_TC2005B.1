console.log('hola, mundo!');
console.log('Ya no tuve que detener el servidor');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const rutasUnidades = require('../routes/unidades');

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use('/unidades', rutasUnidades);

app.get('/about', (request, response, next) => {
    response.render('about');
});

app.get('/location', (request, response, next) => {
    response.render('location');
});

app.get('/shop', (request, response, next) => {
    response.render('shop');
});

app.get('/', (request, response, next) => {
    response.render('inicio');
});

app.use( (request, response, next) => {
    response.status(404).send('<h1>Pagina no encontrada en la base de datos de NERV.</h1>');
} );

app.listen(3000);