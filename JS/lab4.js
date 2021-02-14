//LABORATORIO 4

//Ejercicio 1
document.write('<h2> Ejercicio 1 </h2>');
const n = prompt("¿Escribe un numero?");

for (let i = 0; i <= n; i++){
    document.write(`<p> n:${i}, n^2:${i * i}, n^3:${i * i * i} </p>`);
}

//Ejercicio 2
document.write('<h2> Ejercicio 2 </h2>');

// Retorna un número aleatorio entre min y max.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

var n1 = getRandomInt(0, 100);
var n2 = getRandomInt(0, 100);
var sum = n1 + n2;

var inicio = Date.now();
const result = prompt(`Suma de: ${n1}+${n2}`);
var fin = Date.now();
var transcurso = (fin - inicio)/1000; // tiempo en milisegundos;

if (result == sum){
    alert(`Has acertado tardaste: ${transcurso} segundos.`);
    document.write(`<p> Has acertado tardaste: ${transcurso} segundos. </p>`)
}
else{
    alert(`Te has equivocado, el resultado era ${sum} y tardaste ${transcurso} segundos.`);
    document.write(`<p> Te has equivocado, el resultado era ${sum} y tradaste ${transcurso} segundos. </p>`)
}

//Ejercicio 3
document.write('<h2> Ejercicio 3 </h2>');

function contadorArreglos(arr){
    let ceros = 0;
    let positivos = 0;
    let negativos = 0;

    for (let i = 0; i < arr.length; i++){

        if (arr[i] == 0){
            ceros++;
        }

        else if (arr[i] > 0){
            positivos++;
        }

        else {
            negativos++;
        }
    }

    return (`Ceros = ${ceros}, Positivos = ${positivos}, Negativos = ${negativos}`);
}

const arr = [0,0,-2,-3,-5,4,1,2,4,5,4];
document.write(`<p> El siguiente arreglo: ${arr.toString()} </p>`);
document.write(`<p> Contiene: ${contadorArreglos(arr)} </p>`);

//Ejercicio 4
document.write('<h2> Ejercicio 4 </h2>');

function PromedioRenglones(matrix){
    let arrProm = [];
    let sum = 0;
    let prom = 0;
    
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            sum = matrix[i][j] + sum;
        }
        prom = (sum/matrix[i].length);
        arrProm.push(prom);
        sum = 0;
    }

    return arrProm;
}

const matrix = [[7,8,5],[4,3,2],[10,5,4]];
document.write(`<p> En la siguiente matriz: </p>`);
for(let i = 0; i < matrix.length; i++){
    document.write(`<p> ${matrix[i]} </p>`);
}
document.write(`<p> El promedio de cada uno de sus renglones o filas es: ${PromedioRenglones(matrix)} </p>`);

//Ejercicio 5
document.write('<h2> Ejercicio 5 </h2>');

function invertir(numero){
    let invertido = 0;
    let resto = numero;
    do {
      invertido = invertido * 10 + (resto % 10);
      resto = Math.floor(resto / 10);
    } while ( resto > 0 )
    return invertido;
}

var number = 123;
document.write(`<p> El inverso del numero ${number} es: ${invertir(number)} </p>`);

//Ejercicio 6
//La clase creada permite guardar informacion de articulos comprados en una tienda.
document.write('<h2> Ejercicio 6 </h2>');

class Compra{
    constructor(nombre, descripcion, precio){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio
    }

    toString(){
        return (`${this.nombre} / ${this.precio} pesos / ${this.descripcion}`);
    }
    
    //Descuento pasado como parametro en decimal
    aplicarDescuento(descuento){
        let ahorro = this.precio * descuento;
        let aux = 1 - descuento;
        this.precio = this.precio * aux;
        return (`El precio de ${this.nombre} ahora es de ${this.precio} pesos. Obtuvo un ahorro de ${ahorro} pesos.`)
    }

    //Calcula los impuestos pagados por el articulo
    impuestos(){
        const IVA = 0.16;
        return (`El total de impuestos que se pago por ${this.nombre} es de ${this.precio*IVA} pesos.`);
    }
}

const huevo = new Compra('huevo','Docena de huevo marca San Juan', 35);
const videojuego = new Compra('Halo Infinite', 'Juego para XBOX edicion coleccionista', 3500);
const telefono = new Compra('Samsung Galaxy S20 FE','Dual SIM 256 GB cloud red 8 GB RAM', 15000);

document.write(`<p> ${huevo.toString()} </p>`);
document.write(`<p> ${huevo.impuestos()} </p>`);

document.write(`<p> ${videojuego.toString()} </p>`);
document.write(`<p> ${videojuego.impuestos()} </p>`);

document.write(`<p> ${telefono.toString()} </p>`);
document.write(`<p> ${telefono.impuestos()} </p>`);

//Aplicamos descuento al telefono del 35%
document.write(`<p> ${telefono.aplicarDescuento(0.35)} </p>`);