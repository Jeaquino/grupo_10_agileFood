const express = require("express");
const router = express.Router();

const multer = require('multer');
const path = require('path');


let storage = multer.diskStorage({
    destination: function(req,file, callback){
        callback(null,'public/images/productos')
    },
    filename:function(req, file, callback){
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage:storage});

const controller = require("../controllers/productsController");

router.get("/", controller.productos)  // utilizo el metodo listar de productsController
router.get("/create", controller.agregar)  // utilizo el metodo agregar de productsController
router.post("/create", upload.any(), controller.crear)  // utilizo el metodo crear de productsController
router.get("/cart", controller.carrito)  // utilizo el metodo carrito de productsController
router.get("/:id", controller.detalle)  // utilizo el metodo detalle de productsController
router.get("/edit/:id", controller.form)  // utilizo el metodo carrito de productsController
router.post("/edit", controller.edit)  // utilizo el metodo carrito de productsController

module.exports = router;