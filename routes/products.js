const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController")

router.get("/", controller.productos)  // utilizo el metodo listar de productsController
router.get("/create", controller.agregar)  // utilizo el metodo agregar de productsController
router.post("/create", controller.crear)  // utilizo el metodo crear de productsController
router.get("/cart", controller.carrito)  // utilizo el metodo carrito de productsController
router.get("/edit/:id", controller.edit)  // utilizo el metodo carrito de productsController
router.get("/:id", controller.detalle)  // utilizo el metodo detalle de productsController
/*router.get("/:id/edit", controller.editar)  // utilizo el metodo editar de productsController
*/
module.exports = router;