const express = require('express');
const cors = require('cors');
const { dbConection } = require('../db/config');
class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.listen();

        this.paths = {
            categories : '/api/categories',
            users      : '/api/users',
            auth       : '/api/auth',
            products   : '/api/products',
            buscar     : '/api/buscar'
        }
        
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
        this.app.use( this.paths.users,require('../routes/users'));
        this.app.use( this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.categories,require('../routes/categories'));
        this.app.use(this.paths.products,require('../routes/products'))
        this.app.use(this.paths.buscar,require('../routes/buscar'))
    };

    listen(){
        this.app.listen(this.port,()=>{
            console.log('app running on port',this.port);
        });

    };


}

module.exports = Server