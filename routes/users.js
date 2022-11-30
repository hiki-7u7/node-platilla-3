const {Router} = require('express');
const {check} = require('express-validator');

const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');
const {roleValido, emailValidate,existeIdEnDb} = require('../helpers/db-validation');

const { validation} = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-token');
const { validiarRole, validarRoles } = require('../middlewares/validar-role');

const router = Router()


// GET
router.get('/',usersGet );

// POST
router.post('/' ,[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailValidate),
    check('password','La contraseña es obligatoria y debe tener un minimo de 6 caracteres').isLength({min:6}),
    check('rol').custom(roleValido),
    validation
], usersPost );

// PUT
router.put('/:id' ,[
    check('id',"El id no es valido").isMongoId(),
    check('id').custom(existeIdEnDb),
    check('rol').custom(roleValido),
    validation
], usersPut );

// DELETE
router.delete('/:id' ,[
    validarToken,
    //validiarRole,
    validarRoles('ADMIN_ROLE','VENTAS_ROLE'),
    check('id',"El id no es valido").isMongoId(),
    check('id').custom(existeIdEnDb),
    validation
], usersDelete );

// PATCH
router.patch('/', usersPatch );


module.exports = router
