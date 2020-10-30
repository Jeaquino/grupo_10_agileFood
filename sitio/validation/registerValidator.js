const { check, validatorResult, body } = require("express-validator");
const db = require('../database/models')
/*aca solicito express validator lo requiero de esta forma con la _base de datos_propiamente dicha 
se exporta un array de validaciones _aca abajo_ cada una de ellas*/
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

check('email')
    .isEmail()
    .withMessage('Ingrese un email válido'),

body("email") //checkeo el email
.custom(function(value) {
    return db.usuarios.findOne({
        where:{
            email:value
        }
    })
    .then(usuario => {
        if(usuario){
            return Promise.reject("el email ya se encuentra registado")
        }
    }) 
}),

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

check("contrasena")
.isLength({
    min: 8,
    max: 18
})
.withMessage("debe ingresar una contraseña 8 a 12 caracteres"),

check("contrasena")
.isAlphanumeric()
.withMessage("Solo se aceptan valores alphanumericos"),

body("verificacion")
.custom(function(value,{ req }){
    if (value != req.body.contrasena){
        return false
    }
    return true
})
.withMessage("las contraseñas no cohinciden porfavor intente nuevamente"),

check("aceptacion")
.isLength({
    min: 1
})
.withMessage("Debe aceptar nuestras condiciones"),
body('image')
    .custom((value,{req})=>{
        if(req.errorValidacionImagen){
            return false
        }else{
            return true
        }
    }).withMessage("Solo se permiten archivos de imagen png, jpg, jpeg, gif")
]
/*salen errorres  */