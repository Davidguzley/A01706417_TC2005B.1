//Ejercicio 1
function Promedio(arr){
    let sum = 0;
    let prom = 0;
    
    for(let i = 0; i < arr.length; i++){
        sum = matrix[i] + sum;
    }
    prom = (sum/arr.length);

    return prom;
}
const arr = [10,10,10,10,9];

//Servidor
const http = require('http');

const server = http.createServer( (request, response) => {
    console.log(request.url);
    response.setHeader('Content-Type', 'text/html');
    response.write("<html>");
    response.write("<head><title>Servidor node</title></head>");
    response.write("<body>");
    response.write(`<h1> Ejercicio 1 </h1>`);
    response.write(`<p> En el siguiente arreglo: ${arr.toString()} </p>`);
    response.write(`<p> El promedio es: ${Promedio(arr)} </p>`);
    response.write(`<h1> Ejercicio 2 </h1>`);
    response.write("</body>");
    response.write("</html>");
    response.end();
});

server.listen(3000);