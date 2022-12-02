const {response} = require('express')
const { Usuario, Producto, Categoria } = require('../models')
const { ObjectId } = require('mongoose').Types

const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'categorias',
    'roles'
]

const buscarUsuarios = async(terminos = '',res = response)=>{

    const esMongoId = ObjectId.isValid(terminos)

    if(esMongoId){
        const usuario = await Usuario.findById(terminos)
       return res.json({
            results : (usuario) ? [usuario] : [] 
        })
    }

    const regex = new RegExp(terminos,'i')
    const usuarios = await Usuario.find({
        $or: [{nombre : regex} , {correo : regex}],
        $and: [{estado : true}]
    })

    res.json({
        total  : usuarios.length,
        results: usuarios
    })

}

const buscarProductos = async(terminos = '',res = response)=>{

    const esMongoId = ObjectId.isValid(terminos)

    if(esMongoId){
        const producto = await Producto.findById(terminos)
                               .populate('usuario','nombre')
                               .populate('categoria','nombre');
       return res.json({
            results : (producto) ? [producto] : [] 
        })
    }

    const regex = new RegExp(terminos,'i')
    const productos = await Producto.find({nombre: regex, estado : true})
                            .populate('usuario','nombre')
                            .populate('categoria','nombre');

    res.json({
        total:   productos.length,
        results: productos
    })

}

const buscarCategorias = async(terminos = '',res = response)=>{

    const esMongoId = ObjectId.isValid(terminos)

    if(esMongoId){
        const categoria = await Categoria.findById(terminos)
                               .populate('usuario','nombre')
       return res.json({
            results : (categoria) ? [categoria] : [] 
        })
    }

    const regex = new RegExp(terminos,'i')
    const categorias = await Categoria.find({nombre: regex, estado : true})
                            .populate('usuario','nombre')

    res.json({
        total : categorias.length,
        results : categorias
    })

}

const buscar = (req,res = response)=>{
    const {coleccion,terminos} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg : `las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(terminos,res)
        break;
        case 'productos':
            buscarProductos(terminos,res)

        break;
        case 'categorias':
            buscarCategorias(terminos,res)

        break;
        default:
        return res.status(500).json({
            msg:'se me olvido hacer esta busqueda'
        })
    }
}

module.exports = {
    buscar
}