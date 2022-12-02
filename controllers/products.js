const { Producto } = require("../models")

const obtenerProductos = async(req,res)=>{

    const {limit = 5,desde = 0} = req.query;

    const [productos,total] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado : true})
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .limit(Number(limit))
            .skip(Number(desde))
    ])

    res.json({
        productos,
        total
    })
}

const obtenerProducto = async(req,res)=>{
    const {id} = req.params;
    const producto = await Producto.findOne({_id:id})
        .populate('usuario','nombre')
        .populate('categoria','nombre');

    if(!producto.estado){
        return res.status(400).json({
            msg:`La categoria ${producto.nombre} esta en estado false`
        })
    }
    
    res.json({
        producto
    })
}

const crearProducto = async(req,res)=>{
    try {
        const {nombre,categoria,precio} = req.body
        const productoDB = await Producto.findOne({nombre:nombre.toUpperCase()})
    
        // Verificar si existe
        if(productoDB){
            return res.status(400).json({
                msg : `el producto ${nombre} ya existe`
            })
        }
        
        // Crear data y guardar en DB
        const data = {
            nombre : nombre.toUpperCase(),
            usuario : req.usuario._id,
            categoria,
            precio
        }
        console.log(data);
        const producto = new Producto(data)
        await producto.save() 
    
        res.status(201).json({producto})
        
    }catch(error) {

        res.status(500).json({
            msg:'ah ocurrido un error inesperado'
        })
    }

}

const actualizarProducto = async (req,res)=>{
    const {id} = req.params;
    const {_id,estado,usuario,disponible,...resto} = req.body;
    const producto = await Producto.findByIdAndUpdate(id,{...resto,nombre: resto.nombre.toUpperCase()},{returnDocument:"after"})

    res.json({
        producto
    })
}

const borrarProducto = async(req,res)=>{
    const {id} = req.params;
    const producto  = await Producto.findByIdAndUpdate(id,{estado:false,disponible:false},{returnDocument:'after'})
        .populate('usuario','nombre')
        .populate('categoria','nombre')
    
    res.json({
        producto
    })
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}