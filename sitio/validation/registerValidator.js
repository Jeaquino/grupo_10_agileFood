const { check, validatorResult, body } = require("express-validator");
const dbUsuario = require("../data/userDataBase");
/*aca solicito express validator lo requiero de esta forma con la _base de datos_propiamente dicha 
se exporta un array de validaciones _aca abajo_ cada una de ellas*/
module.exports = [
check("nombre") //checkeo el nombre
.isLength({
    min: 1
})
.withMessage("debes ingresar un nombre real, no se aceptan simbolos, ni números"),

check("apellido") //checkeo el apellido
.isLength({
    min: 1
})
.withMessage("debes ingresar un apellido real, no se aceptan simbolos, ni números "),

body("email") //checkeo el email
.custom(function(value) {
    console.log(value)

    let usuario = dbUsuario.filter(user => { //filtro la base de datos y asigno resultado a la variable
        return user.email == value //aplico la condicion si cohincide el email que el usuario ingreso en el input con el que esta registrado con anterioridad
    })
    //Se debe cambiar el metodo de busqueda o la consulta de la codición. Filter te devuelve un array de los resultados que coninciden con el paramatro buscado, y estas consultando el valor booleana de la variable usuario, y usuario es un array o null, por lo tanto esa consulta siempre va a arrojar false.
    if (usuario == false) {
        return true
    } else {
        return false
    }
})
.withMessage("Este mail ya se encuentre registrado, por favor utilice otro"),

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
.withMessage("debe ingresar una contraseña 6 y 12 caracteres"),

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
]
/*salen errorres  */