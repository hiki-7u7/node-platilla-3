const {Router}     =  require ('express');
const {check}      =  require('express-validator');
const { obtenerCategorias, obtenerCategoria,actualizarCategoria,borrarCategoria,crearCategoria } = require('../controllers/categories');
const {existeCategoriaIdEnDb} = require('../helpers/db-validation')
const {validation} =  require('../middlewares/validar-campos');
const { validiarRole } = require('../middlewares/validar-role');
const {validarToken} =  require('../middlewares/validar-token');

const router = Router();


// Obtener todas las categorias - publico
router.get('/',obtenerCategorias)


// Obtener solo una categoria - publico
router.get('/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existeCategoriaIdEnDb),
    validation
],obtenerCategoria)


// Crear una categoria - admin
router.post('/',[
    validarToken,
    check('nombre','el  nombre es obligatorio').not().isEmpty(),
    validation
],crearCategoria)


// Modificar una categoria - admin
router.put('/:id',[
    validarToken,
    check('id',"El id no es valido").isMongoId(),
    check('id').custom(existeCategoriaIdEnDb),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validation
],actualizarCategoria)


// Eliminar una categoria - admin
router.delete('/:id',[
    validarToken,
    validiarRole,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(existeCategoriaIdEnDb),
    validation
],borrarCategoria)


module.exports = router