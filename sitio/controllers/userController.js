const dbUser = require("../data/userDataBase"); //base de datos de usuarios
const dbProduct = require("../data/database"); //base de datos de productos
const db = require('../database/models'); // requiero la base de datos de mysql

const bcrypt = require("bcrypt"); //se requiere encriptado
const fs = require("fs"); //se requiere file system---
const {
    validationResult
} = require("express-validator");
const path = require("path")

module.exports = {

    registro: function (req, res, next) { //_3_me renderiza a la pagina_registroUsuario_

        res.render('registroUsuario', {
            css: "style",
            title: "Registro",
            usuario: req.session.usuario
        });
    },

    login: function (req, res, next) {

        res.render('login', {
            css: "login",
            title: "Inicio de sesion",
            usuario: req.session.usuario
        });
    },
    /*agregue nuevoo proceso de registro  */
    processRegister: function (req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.usuarios.create({
                    nombre: req.body.nombre.trim(),
                    apellido: req.body.apellido.trim(),
                    email: req.body.email.trim(),
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
                        .then(domicilio => {
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
                css: "style",
                title: "Registro",
                errors: errors.mapped(),
                inputs: req.body,
                usuario: req.session.usuario
            })
        }
    },

    verificarLogin: function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            db.usuarios.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then(usuario => {
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
        let categorias = [];
        let productos = [];
        let seccion;

        dbProduct.forEach(producto => {
            if (!categorias.includes(producto.category)) {
                categorias.push(producto.category)
            }
        })

        categorias.forEach(categoria => {
            seccion = dbProduct.filter(producto => {
                return producto.category == categoria
            })
            productos.push({
                categoria: categoria,
                productos: seccion
            });
        })

        res.render('productosAdministrador', {
            css: "productosAdmin",
            title: "Productos Administrador",
            productos: productos,
            usuario: req.session.usuario
        })
    },

    logout: function (req, res) {
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