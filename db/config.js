const moongose = require('mongoose');

const dbConection = async () => {

    try {
        const conection = await moongose.connect(process.env.MONGODB_ATLAS)

        console.log('base de datos iniciada')
        
    }catch(err){
        throw new Error('Error al iniciar la base de datos')
    }
    
}

module.exports={
    dbConection,

}