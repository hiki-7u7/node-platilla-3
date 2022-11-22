const {response,request} = require('express')

const usersGet = (req = request,res = response)=>{

    const {limit = 1 ,page = 10} = req.query
    res.status(200).json({
        ok:true,
        message:'peticion get --controllers',
        limit,
        page
    });
}

const usersPost = (req,res = response)=>{

    const {name,edad} = req.body
    res.status(200).json({
        ok:true,
        message:'peticion post --controllers',
        name,
        edad,
    });
}

const usersPut = (req,res = response)=>{

    const id = req.params.id
    res.status(200).json({
        ok:true,
        message:'peticion put --controllers',
        id
    });
}

const usersPatch = (req,res = response)=>{

    res.status(200).json({
        ok:true,
        message:'peticion patch --controllers'
    });
}

const usersDelete = (req,res = response)=>{

    res.status(200).json({
        ok:true,
        message:'peticion delete --controllers'
    });
}


module.exports={
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}