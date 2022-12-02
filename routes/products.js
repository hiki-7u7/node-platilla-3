const {Router} = require('express');
const {check} = require('express-validator')
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/products');
const { existeProductoIdEnDb } = require('../helpers/db-validation');
const { validation } = require('../middlewares/validar-campos');
const { validiarRole } = require('../middlewares/validar-role');
const { validarToken } = require('../middlewares/validar-token');
const router = Router()



router.get('/',obtenerProductos);

router.get('/:id', [
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existeProductoIdEnDb),
    validation
] ,obtenerProducto);

router.post('/', [
    validarToken,
    check('categoria','La categoria no es un id mongo valido').isMongoId(),
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validation
] , crearProducto);

router.put('/:id',[
    validarToken,
    check('id','el id mongo no es valido').isMongoId(),
    check('nombre','el nombre es necesario').not().isEmpty(),
    check('id').custom(existeProductoIdEnDb),
    validation
], actualizarProducto);

router.delete('/:id',[
    validarToken,
    validiarRole,
    check('id','el id mongo no es valido').isMongoId(),
    check('id').custom(existeProductoIdEnDb),
    validation
],borrarProducto)

module.exports = router