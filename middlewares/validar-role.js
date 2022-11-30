const validiarRole = (req,res,next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg:'Esta intentado validar el usuario sin antes valdiar el token'
        })
    }

    const {rol} = req.usuario
    if(rol !== 'ADMIN_ROLE'){
        return res.json({
            msg:'El usuario no es administrador no puede hacer esto'
        })
    }

    next()
}

const validarRoles = (...roles)=>{

    return (req,res,next)=> {
        
        if(!req.usuario){
            return res.json({
                msg:'Esta intentado validar el usuario sin antes valdiar el token'
            })
        }
        
        if(!roles.includes(req.usuario.rol)){
            return res.json({
                msg:'El rol no es valido para realizar esta opcion'
            })
        }

        next()
    }
}

module.exports={
    validiarRole,
    validarRoles
}