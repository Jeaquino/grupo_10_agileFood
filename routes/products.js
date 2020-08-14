const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController")

router.get("/", controller.productos)  // utilizo el metodo listar de productsController
router.get("/:id", controller.detail)  // utilizo el metodo listar de productsController


module.exports = router;