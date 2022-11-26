const express = require('express');
const cors = require('cors');
const { dbConection } = require('../db/config');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        this.listen();
        
        // DB
        this.conectarDB();

        // Midlewears
        this.midlewears();

        // Rutas
        this.routes();
    };
    
    async conectarDB(){
        await dbConection()
    }
    
    midlewears(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))

    }

    routes(){
       this.app.use( this.userPath ,require('../routes/users'))

    };

    listen(){
        this.app.listen(this.port,()=>{
            console.log('app running on port',this.port);
        });

    };


}

module.exports = Server