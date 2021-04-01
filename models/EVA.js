//onst EVAS = [{nombre: "00", children: "Rei Ayanami", pais: "Japón", imagen: "media/eva00.png"}, {nombre: "01", children: "Shinji Ikari", pais: "Japón", imagen: "media/eva01.gif"},{nombre: "02", children: "Asuka Langley", pais: "Alemania", imagen: "media/eva02.png"}];
const db = require('../util/database');

module.exports = class EVA{
    constructor(NumUnidad, Children, Pais, Imagen){
        this.NumUnidad = NumUnidad;
        this.Children = Children;
        this.Pais = Pais;
        this.Imagen = Imagen;
    }

    toString(){
        return (`Unidad EVA ${this.NumUnidad} pilotada por ${this.Children} de ${this.Pais}.`);
    }

    save() {
        return db.execute('INSERT INTO unidades (NumUnidad, Children, Pais, Imagen) VALUES (?, ?, ?, ?)',
            [this.NumUnidad, this.Children, this.Pais, this.Imagen]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM unidades');
    }

    static fetchOne(NumUnidad) {
        return db.execute('SELECT * FROM unidades WHERE NumUnidad=?', [NumUnidad]);
    }
}