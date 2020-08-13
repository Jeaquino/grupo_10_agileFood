const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController")

router.get("/", controller.home)  // utilizo el metodo listar de productsController

module.exports = router;
