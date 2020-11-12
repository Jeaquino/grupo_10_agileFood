var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController");

const sessionUserCheck = require("../middlewares/sessionUserCheck"); //se necesita requerir
const upImagePerfil = require("../middlewares/upImagePerfil"); //se necesita requerir
const registerValidator = require("../validation/registerValidator")
const loginValidator = require("../validation/loginValidator")


router.get("/", controller.login); //renderizo la vista del login
router.post("/", loginValidator, controller.verificarLogin) 
//requiero el archivo loginValidator que tiene los check para validar el Login, luego ejecuto el metodo de controler processLogin

router.get("/registrarme", controller.registro) // renderizo la vista de registro
router.post("/registrarme", upImagePerfil.any(), registerValidator, controller.processRegister); //valido utilizando el archivo registerValitor, luego ejecuto processRegister del controlador user
router.get("/datosUsuarios", sessionUserCheck, controller.datosUsuarios);
router.put("/datosUsuarios", upImagePerfil.any(), registerValidator,controller.actualizarDatos)

router.get('/Administrador',sessionUserCheck, controller.productosAdmin)

router.get('/logout',controller.logout);

module.exports = router;