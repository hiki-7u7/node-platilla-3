const {response,request} = require('express')
const jwt= require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarToken = async (req = request,res = response,next)=>{

    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:'No autorizado'
        })
    }
    
    try{

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)
        const usuario =  await Usuario.findById(uid)

        // Verificar si existe usuario
        if(!usuario){
            return res.json({
                msg : 'El usuario no existe en nuestra base de datos'
            })
        }

        // Verificar estado del usuario 
        if(!usuario.estado){
            return res.json({
                msg:'El estado del usuario no esta activo'
            })
        }
        
        req.usuario = usuario
        req.uid = uid
        
        next()

    }catch (error){

        console.log(error);

        res.json({msg:'El token no es valido'});
    }

}
module.exports={
    validarToken
}