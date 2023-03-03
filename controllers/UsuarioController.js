const Usuario = require('../models/Usuario')

const bcryptjs = require('bcryptjs')

const UsuarioController = {
    signup: async(req, res) => {
        let {
            nickname,
            password
        } = req.body
        try {
            let usuario = await Usuario.findOne({nickname})

            if (!usuario) {
                let logged = false

                password = bcryptjs.hashSync(password,10)
                
                usuario = await new Usuario({nickname, password, logged}).save()

                res.status(200).json({
                    success: true,
                    message: 'Usuario creado con éxito'
                })
            } else {
                res.status(200).json({
                    message: 'El usuario ya existe',
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'No se pudo crear el usuario'
            })
        }
    },

    signin: async(req, res) => {
        const {nickname, password} = req.body;

        try {
            const usuario = await Usuario.findOne({nickname});
            if (!usuario) { // Si el usuario no existe
                res.status(404).json({
                    message: 'Usuario inexistente',
                    success: false
                });
            } else { // Si usuario existe
                const checkPass = usuario.password.filter(passwordElement => bcryptjs.compareSync(password, passwordElement))

                if(checkPass.length > 0) { // Si la contraseña coincide
                    usuario.logged = true
                    await usuario.save()

                    res.status(200).json({
                        message: 'Bienvenido!',
                        success: true
                    })
                } else { // Si la contraseña no coincide
                    res.status(400).json({
                        message: 'Usuario o ontraseña incorrecta',
                        success: false
                    })
                }
            }
        } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'No se ha podido iniciar sesión, intente más tarde',
            success: false
            })
        }
    },

    signout: async(req, res) => {
        const {nickname} = req.body;

        try {
            const usuario = await Usuario.findOne({nickname})

            usuario.logged = false
            await usuario.save()

            res.status(200).json({
                message: 'Hasta luego',
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success: false,
                message: 'No se ha podido cerrar sesión, intente más tarde'
            })
        }
    }
}

module.exports = UsuarioController