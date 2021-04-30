console.log('Corriendo servidor');

const isAuth = require('../util/is-auth');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');

const session = require('express-session');

const csrf = require('csurf');
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const rutasUnidades = require('../routes/unidades');
const rutasUsers = require('../routes/users')

//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Para carga de archivos
const multer = require('multer');

//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos 
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    },
});

//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir, 
//pero hay diferentes opciones si se quieren subir varios archivos. 
//'archivo' es el nombre del input tipo file de la forma
app.use(multer(
    { storage: fileStorage }
    //{ dest: 'uploads' }
    ).single('Imagen'));  

//Para acceder a los recursos de la carpeta public
app.use(express.static(path.join(__dirname,'..', 'public')));

//Para acceder a los recursos de la carpeta uploads
app.use(express.static(path.join(__dirname,'..', 'uploads')));

//Para acceder a los valores de las cookies
app.use(cookieParser());

//Para trabajar con sesiones
app.use(session({
    secret: 'kñsjdnrkncllñkm', 
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//Para estar protegido ante CSRF
app.use(csrfProtection);

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

app.get('/shop', isAuth, (request, response, next) => {
    response.render('shop', {
        isLoggedIn: request.session.isLoggedIn === true ? true : false
    });
});

app.get('/anime', isAuth, (request, response, next) => {
    response.render('anime', {
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