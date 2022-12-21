const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar_jwt");

const login = async (req, res = response) => {
    const { correo, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ correo, estado: true });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / contraseña incorrectos'
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / contraseña incorrectos'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
}

module.exports = {
    login
}