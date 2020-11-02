const express = require("express");
const router = express.Router();
const validatorProduct = require("../validation/productvalidator");
const sessionUserCheck = require("../middlewares/sessionUserCheck");
const upImagenProduct = require("../middlewares/upImagenProduct");
const controller = require("../controllers/productsController");

router.get("/", controller.productos) // utilizo el metodo listar de productsController
router.get("/create", controller.agregar) // utilizo el metodo agregar de productsController
router.post("/create", upImagenProduct.any(), validatorProduct, controller.crear) // utilizo el metodo crear de productsController

router.get("/cart", sessionUserCheck, controller.carrito) // utilizo el metodo carrito de productsController
router.get("/:id", controller.detalle) // utilizo el metodo detalle de productsController
router.get("/edit/:id", controller.form) // utilizo el metodo form de productsController
router.put("/edit/:id", upImagenProduct.any(), controller.edit) // utilizo el metodo edit de productsController
router.delete('/delete/:id', controller.eliminar); //utilizo el metodo eliminar de productsController

module.exports = router;