console.log('hola, mundo!');
console.log('Ya no tuve que detener el servidor');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const rutasUnidades = require('../routes/unidades');
const rutasUsers = require('../routes/users')

//Middleware
app.use(bodyParser.urlencoded({extended: false}));

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname,'..', 'public')));

//Para acceder a los valores de las cookies
app.use(cookieParser());
//Para trabajar con sesiones
app.use(session({
    secret: 'kñsjdnrkncllñkm', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

app.use('/unidades', rutasUnidades);

app.use('/users/', rutasUsers);

app.get('/preguntas', (request, response, next) => {
    response.render('preguntas', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.get('/acerca', (request, response, next) => {
    response.render('about', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.get('/ubicacion', (request, response, next) => {
    response.render('ubicacion', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.get('/shop', (request, response, next) => {
    response.render('shop', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.get('/', (request, response, next) => {
    console.log(request.session);
    response.render('inicio', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.use( (request, response, next) => {
    response.status(404).send('<h1>Pagina no encontrada en la base de datos de NERV.</h1>');
} );

app.listen(3000);