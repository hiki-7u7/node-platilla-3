const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSign } = require('../controllers/auths');
const { validation } = require('../middlewares/validar-campos');
const router = Router()

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validation
],login)

router.post('/google',[
    check('id_token','El token es obligatorio').not().isEmpty(),
    validation
],googleSign)

module.exports = router