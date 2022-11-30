const {response,request} = require('express');
const { generarJWT } = require('../helpers/validar-JWT');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request,res = response)=>{

    const {correo,password} = req.body

    try {
        const usuario = await Usuario.findOne({correo});

        // Verificar correo
        if(!usuario){
            return res.json({
                msg:'Error en el correo/password  - correo'
            })
        }

        // Verificar estado
        if(!usuario.estado){
            return res.json({
                msg:'Error en el correo/password  - estado'
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password)
        if(!validPassword){
            return res.json({
                msg:'Error en el correo/password  - password'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)
      
        res.json({
            usuario,
            token
        })

    }catch(err){
        res.status(500).json({
            msg:'ah ocurrido un error'
        })
    }
}

const googleSign = async(req = request,res=response)=>{

    try {
        const {id_token} = req.body;

        const {correo,nombre,img} = await googleVerify(id_token)

        // Verificar si email existe
        let usuario = await Usuario.findOne({correo})
        if(!usuario){
            const data = {
                correo,
                nombre,
                img,
                password:':D',
                google:true,
                rol:'ADMIN_ROLE'
            }

            usuario = new Usuario(data) 
            await usuario.save()
        }

        // Verificar Estado
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Hable con el administradir --usuario bloqueado'
            })
        }

        //Generar JWT
        let token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.json({
            ok:false,
            msg:'todo mal'
        })
    }
}


module.exports = {
    login,
    googleSign
}