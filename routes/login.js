const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController")

router.get("/", controller.detail)  // utilizo el metodo listar de productsController

module.exports = router;