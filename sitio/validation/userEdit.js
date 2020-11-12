const { check, validatorResult, body } = require("express-validator");
const db = require('../database/models')
/*aca solicito express validator lo requiero de esta forma con la _base de datos_propiamente dicha 
se exporta un array de validaciones _aca abajo_ cada una de ellas*/
let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;

module.exports = [
check("nombre") //checkeo el nombre
.isLength({
    min: 2
})
.withMessage("debes ingresar un nombre real, no se aceptan simbolos, ni números"),

check("apellido") //checkeo el apellido
.isLength({
    min: 2
})
.withMessage("debes ingresar un apellido real, no se aceptan simbolos, ni números "),

check("calle") //checkeo el apellido
.isLength({
    min: 1
})
.withMessage("Ingrese el nombre de la calle, solo el nombre"),

check("numero")
.isLength({
    min: 1
})
.withMessage("Ingrese la enumeración de su domicilio"),

check("numero")
.isNumeric()
.withMessage("solo se aceptan números"),

check("localidad") //checkeo el apellido
.isLength({
    min: 1
})
.withMessage("Ingrese su localidad, solo el nombre"),

]
/*salen errorres  */