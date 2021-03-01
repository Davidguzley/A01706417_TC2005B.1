const EVAS = [{nombre: "00", children: "Rei Ayanami", pais: "Japón", imagen: "media/eva00.png"}, {nombre: "01", children: "Shinji Ikari", pais: "Japón", imagen: "media/eva01.gif"},{nombre: "02", children: "Asuka Langley", pais: "Alemania", imagen: "media/eva02.png"}];

module.exports = class EVA{
    constructor(nombre, children, pais, imagen){
        this.nombre = nombre;
        this.children = children;
        this.pais = pais;
        this.imagen = imagen;
    }

    toString(){
       console.log(`Unidad EVA ${this.nombre} pilotada por ${this.children} de ${this.pais}.`);
        return (`Unidad EVA ${this.nombre} pilotada por ${this.children} de ${this.pais}.`);
    }

    /*mostrar(){
        return (`${this.imagen}`);
    }*/

    save(){
        EVAS.push(this);
    }

    static fetchAll() {
        return EVAS;
    }
}