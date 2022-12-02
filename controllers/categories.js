const {response,request} = require('express');
const {Categoria} = require('../models');


const obtenerCategorias = async (req = request , res = response)=>{
    const {limit = 5,desde = 0} = req.query;

    const [categorias,total] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado : true})
            .populate('usuario','nombre')
            .limit(Number(limit))
            .skip(Number(desde))
    ])

    res.json({
        categorias,
        total
    })
}

const obtenerCategoria = async (req = request , res = response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findOne({_id:id}).populate('usuario','nombre');

    if(!categoria.estado){
        return res.status(400).json({
            msg:`La categoria ${categoria.nombre} esta en estado false`
        })
    }
    
    res.json({
        categoria
    })
}

const crearCategoria = async(req = request , res = response)=>{

    try {
        const nombre = req.body.nombre.toUpperCase()
        const categoriaDB = await Categoria.findOne({nombre})
    
        // Verificar si existe
        if(categoriaDB){
            return res.status(400).json({
                msg : `La categoria ${nombre} ya existe`
            })
        }
    
        // Crear data y guardar en DB
        const data = {
            nombre,
            usuario : req.usuario._id
        }
        const categoria = new Categoria(data)
        await categoria.save() 
    
        res.status(201).json({categoria})
        
    }catch(error) {

        res.status(500).json({
            msg:'ah ocurrido un error inesperado'
        })
    }

}

const actualizarCategoria = async(req = request , res = response)=>{
    const {id} = req.params;
    const nombre = req.body.nombre.toUpperCase();
    
    const categoria = await Categoria.findByIdAndUpdate(id,{nombre},{returnDocument:"after"})

    res.json({
        categoria
    })
}

const borrarCategoria = async (req = request , res = response)=>{
    const {id} = req.params;
    const categoria  = await Categoria.findByIdAndUpdate(id,{estado:false},{returnDocument:'after'}).populate('usuario','nombre');
    
    res.json({
        categoria
    })
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}