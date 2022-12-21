const express = require('express');
const cors = require('cors');

const { dbConnection } = require("../database/config")

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios"
        this.authPath = "/api/auth"

        this.conectarDB();
        this.middlewares();

        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.static("public"));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/user"));
        this.app.use(this.authPath, require("../routes/auth"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto ", this.port);
        });
    }
}


module.exports = Server;