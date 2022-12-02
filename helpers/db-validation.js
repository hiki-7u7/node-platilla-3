const { Categoria ,Usuario, Producto} = require("../models");
const Role = require("../models/roles")


const roleValido = async(rol = '')=>{
    const rolFind = await Role.findOne({ rol })

    if(!rolFind){
        throw new Error(`el rol ${rol} no es valido`)
    }
}

const emailValidate = async(correo)=>{
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error('El correo ya existe en la base de datos')
    }
}

const existeIdEnDb = async(id = "")=>{
    const existeIdEnDb = await Usuario.findById(id)
    if(!existeIdEnDb){
        throw new Error(`El ${id} no existe en nuestra base de datos`)
    }
}
const existeCategoriaIdEnDb = async(id = "")=>{
    const existeCategoriaIdEnDb = await Categoria.findById(id)
    //console.log(existeCategoriaIdEnDb); 
    if(!existeCategoriaIdEnDb){
        throw new Error(`El ${id} de la categoria no existe en nuestra base de datos`)
    }
}
const existeProductoIdEnDb = async(id = "")=>{
    const existeProductoIdEnDb = await Producto.findById(id)
    //console.log(existeCategoriaIdEnDb); 
    if(!existeProductoIdEnDb){
        throw new Error(`El ${id} de Producto no existe en nuestra base de datos`)
    }
}

module.exports = {
    roleValido,
    emailValidate,
    existeIdEnDb,
    existeCategoriaIdEnDb,
    existeProductoIdEnDb
}