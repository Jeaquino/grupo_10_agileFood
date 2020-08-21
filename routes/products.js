const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController")

router.get("/", controller.productos)  // utilizo el metodo listar de productsController
router.get("/agregarProducto", controller.agregar)  // utilizo el metodo agregar de productsController
router.get("/carrito", controller.carrito)  // utilizo el metodo carrito de productsController
router.get("/:id", controller.detalle)  // utilizo el metodo detalle de productsController



module.exports = router;