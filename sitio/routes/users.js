var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController");

const sessionUserCheck = require("../middlewares/sessionUserCheck"); //se necesita requerir
const upImageAvatar = require("../middlewares/upImageAvatar"); //se necesita requerir
const registerValidator = require("../validations/registerValidator")
const loginValidator = require("../validations/loginValidator")

router.get("/", controller.login); //renderizo la vista del login
router.post("/", loginValidator, controller.processLogin) 
//requiero el archivo loginValidator que tiene los check para validar el Login, luego ejecuto el metodo de controler processLogin

router.get("/registrarme", controller.registro) // renderizo la vista de registro
router.post("/registrarme", upImageAvatar.any(), registerValidator, controller.processRegister); //valido utilizando el archivo registerValitor, luego ejecuto processRegister del controlador user

router.get('/Administrador', controller.productosAdmin)

router.get("/profile", sessionUserCheck, controller.profile); //agregue nuevo

router.get("/logout", controller.logout); //agregue nuevo

module.exports = router;