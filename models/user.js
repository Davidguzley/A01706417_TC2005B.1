const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User{
    constructor(username, name, password){
        this.username = username;
        this.name = name;
        this.password = password;
    }

    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_encriptado) => {
                console.log(password_encriptado);
                return db.execute('INSERT INTO usuarios (username, name, password) VALUES (?, ?, ?)',
                [this.username, this.name, password_encriptado]
            );
            }).catch(err => console.log(err));
    }

    static fetchOne(username) {
        return db.execute('SELECT * FROM usuarios WHERE username=?', [username]);
    }
}