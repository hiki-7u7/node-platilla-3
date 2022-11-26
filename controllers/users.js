const {response,request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

// GET
const usersGet = async (req = request,res = response)=>{

    const {limit = 6 ,desde = 0} = req.query;

    const resp = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
            .limit(Number(limit))
            .skip(Number(desde))
    ])

    res.status(200).json({
        total : resp[0],
        usuarios: resp[1]
    });
}

// POST
const usersPost = async ( req , res = response)=>{
    
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    // Encriptar
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    // Guardar
    await usuario.save();

    res.json({
        usuario
    });
}


// PUT
const usersPut = async(req,res = response)=>{

    const {id} = req.params;
    const {_id,google,password,correo,...resto} = req.body

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{returnDocument:"after"})
    
    res.status(200).json({
        usuario
    });
}

// PATCH
const usersPatch = (req,res = response)=>{

    res.status(200).json({
        ok:true,
        message:'peticion patch --controllers'
    });
}

//DELETE
const usersDelete = async (req,res = response)=>{
    const {id} = req.params

    const usuarioDelete = await Usuario.findByIdAndUpdate(id,{estado:false},{returnDocument:"after"})
    res.status(200).json({
        usuarioDelete
    });
}


module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}