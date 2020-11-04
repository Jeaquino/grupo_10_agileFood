const dbUser = require("../data/userDataBase"); //base de datos de usuarios
const dbProduct = require("../data/database"); //base de datos de productos
const db = require('../database/models'); // requiero la base de datos de mysql

const bcrypt = require("bcrypt"); //se requiere encriptado
const fs = require("fs"); //se requiere file system---
const { validationResult } = require("express-validator");
const path = require("path")

module.exports = {

    registro: function(req, res, next) { //_3_me renderiza a la pagina_registroUsuario_

        res.render('registroUsuario', {
            css: "registrarUsuario",
            title: "Registro",
            usuario: req.session.usuario
        });
    },

    login: function(req, res, next) {

        res.render('login', {
            css: "login",
            title: "Inicio de sesion",
            usuario: req.session.usuario
        });
    },
    /*agregue nuevoo proceso de registro  */
    processRegister: function(req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.usuarios.create({
                    nombre: req.body.nombre.trim(),
                    apellido: req.body.apellido.trim(),
                    email: req.body.email.trim(),
                    categoria: "usuario",
                    contrasena: bcrypt.hashSync(req.body.contrasena, 10),
                    imagen: (req.files[0]) ? req.files[0].filename : "default-image.png",
                })
                .then(user => {
                    db.domicilios.create({
                            calle: req.body.calle.trim(),
                            altura: req.body.numero.trim(),
                            departamento: req.body.aclaracion.trim(),
                            localidad: req.body.localidad.trim(),
                            idUsuario: user.null
                        })
                        .then(domicilio => { //then=(luego) el codigo consecuencia 
                            db.usuarios.update({
                                idDomicilio: domicilio.null
                            }, {
                                where: {
                                    idUsuario: domicilio.dataValues.idUsuario
                                }
                            })
                        })
                    res.redirect('/users');
                })
                .catch(error => {
                    res.send(error)
                })
        } else {
            res.render("registroUsuario", {
                css: "registrarUsuario",
                title: "Registro",
                errors: errors.mapped(),
                inputs: req.body,
                usuario: req.session.usuario
            })
        }
    },

    verificarLogin: function(req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.usuarios.findOne({
                    //permite que busquemos resultados que cohincidan con los atributos indicados en el objeto
                    //literal que recibe el metodo
                    where: {
                        //dentro del(where) pasamos el atributo de acuerdo con la columna de la tabla y el valor a buscar.
                        email: req.body.email
                    }
                })
                .then(usuario => { //then=(luego) el codigo consecuencia 
                    req.session.usuario = {
                        id: usuario.idUsuario,
                        nick: usuario.nombre + " " + usuario.apellido,
                        email: usuario.email,
                        avatar: usuario.imagen
                    }
                    if (req.body.recordar) {
                        res.cookie('userAgileFood', req.session.usuario, {
                            maxAge: 1000 * 60 * 60
                        })
                    }
                    return res.redirect('/')
                })
                .catch(error => {
                    res.send(error)
                })
        } else {
            res.render('login', {
                title: "inicio de sesion",
                css: "login",
                errors: errors.mapped(),
                inputs: req.body,
                usuario: req.session.usuario
            })
        }
    },

    productosAdmin: (req, res, next) => {
        let categorias;
        db.categorias.findAll({
                //findAll para buscar todos los datos registrados en la tabla
                //la funcion findAll devuelve una promesa , por lo tanto ,la usamos para usar el resultado de la busquedad.
                //El resultado se le asigna un parametro de esta funcion, aqui lo llamammos(elementos), pero podria tener cualquier nombre
                attributes: ["nombre"]
            })
            .then(elementos => {
                categorias = elementos
            })
            .catch(error => {
                res.send(error)
            })

        let productos;

        db.productos.findAll({
                //findAll para buscar todos los datos registrados en la tabla
                include: [{
                    association: "categorias"
                }]
            })
            .then(elementos => { //then=(luego) el codigo consecuencia 
                productos = elementos
                res.render('productosAdministrador', {
                    title: "productos Administrador",
                    categorias: categorias,
                    productos: productos,
                    css: "productosAdmin",
                    usuario: req.session.usuario
                })
            })
            .catch(error => {
                res.send(error)
            })
    },

    logout: function(req, res) {
        req.session.destroy();
        if (req.cookies.userAgileFood) {
            res.cookie('userAgileFood', '', {
                maxAge: -1
            })
        }
        console.log(typeof usuario)
        return res.redirect('/')
    }
}