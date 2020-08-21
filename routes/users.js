var express = require('express');
var router = express.Router();
const controller = require("../controllers/userController")

router.get("/", controller.registro)  // utilizo el metodo listar de productsController

module.exports = router;
