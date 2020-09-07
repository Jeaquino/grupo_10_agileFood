var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController")

router.get("/", controller.login)  // utilizo el metodo listar de productsController
/*router.post("/", check("email").isEmail().whitMessage("Email invalido"), check("password").isLength({min:8}).whitMessage("La contraseña debe tener al menos 8 caracteres"), controller.verificarLogin)  // utilizo el metodo listar de productsController*/
router.get("/registrarme", controller.registro)  // utilizo el metodo listar de productsController
router.post("/registrarme", controller.crear)  // utilizo el metodo listar de productsController
router.get('/Administrador', controller.productosAdmin)

module.exports = router;
