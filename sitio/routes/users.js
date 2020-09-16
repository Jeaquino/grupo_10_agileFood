var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController");
const sessionUserCheck = require("../middlewares/sessionUserCheck"); //se necesita requerir

const upImageAvatar = require("../middlewares/upImageAvatar"); //se necesita requerir

router.get("/", controller.login) // utilizo el metodo listar de productsController
    /*router.post("/", check("email").isEmail().whitMessage("Email invalido"), check("password").isLength({min:8}).whitMessage("La contraseña debe tener al menos 8 caracteres"), controller.verificarLogin)  // utilizo el metodo listar de productsController*/
router.get("/registrarme", controller.registro) // utilizo el metodo listar de productsController_2_renderiza en userControlller
router.post("/registrarme", controller.crear, registerValidator, controller.processRegister); // utilizo el metodo listar de productsController_4_//agrego nuevo

router.get('/Administrador', controller.productosAdmin)

router.get("/login", controller.login); //agregue nuevo
router.post("/login", loginValidator, controller.processLogin); //agregue nuevo

router.get("/profile", sessionUserCheck, controller.profile); //agregue nuevo

router.get("/logout", controller.logout); //agregue nuevo

module.exports = router;