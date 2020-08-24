var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController")

router.get("/", controller.login)  // utilizo el metodo listar de productsController
router.get("/registrarme", controller.registro)  // utilizo el metodo listar de productsController
router.post("/registrarme", controller.crear)  // utilizo el metodo listar de productsController


module.exports = router;
