const dbUser = require("../data/userDataBase"); //base de datos de usuarios
const dbProduct = require("../data/database"); //base de datos de productos

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
            title: "Registro"
        });
    },

    login: function (req, res, next) {

        res.render('login', {
            css: "login",
            title: "Inicio de sesion"
        });
    },
    /*agregue nuevoo proceso de registro  */
    processRegister: function (req, res) {
        let errors = validationResult(req);
        let ultimoId = 0;

        dbUser.forEach(user => {
            if (user.id > ultimoId) {
                ultimoId = user.id;
            }
        })

        if (errors.isEmpty()) {
            let nuevosUsuarios = {
                id: ultimoId + 1,
                nombre: req.body.nomnbre,
                apellido: req.body.apellido,
                domicilio: req.body.calle + " " + req.body.numero,
                detalle: req.body.detalle,
                Localidad: req.body.localidad,
                email: req.body.email,
                contraseña: bcrypt.hashSync(req.body.contraseña, 10), //encripto la contraseña
                image: (req.files[0])?req.files[0].filename:"default-image.png",
                rol: "user"
            }
            dbUser.push(nuevosUsuarios);
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'userDataBase.json'), JSON.stringify(dbUser), 'utf-8');
            return res.redirect('/users/');
        } else {
            res.render("registroUsuario", {
                css: "style",
                title: "Registro",
                errors: errors.mapped(),
                inputs: req.body
            })
        }
    },

    verificarLogin: function (req, res, next) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            dbUser.forEach(usuario => {
                if (usuario.email == req.body.email) {
                    req.session.usuario = {
                        id: usuario.id,
                        nick: usuario.nombre + " " + usuario.apellido,
                        email: usuario.email,
                        avatar: usuario.avatar
                    }
                }
            });
            if (req.body.recordar) {
                res.cookie('userAgileFood', req.session.usuario, {
                    maxAge: 1000 * 60 * 60
                })
            }
            res.redirect('/')
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

    crear: function (req, res, next) {

        let ultimoId = 0;
        if (dbUser.lenght() > 0) {
            dbUser.forEach(user => {
                if (user.id > ultimoId) {
                    ultimoId = user.id;
                }
            })
        }

        let usuario = {
            id: ultimoId + 1,
            nombre: req.body.nomnbre,
            apellido: req.body.apellido,
            domicilio: req.body.calle + " " + req.body.numero,
            detalle: req.body.detalle,
            Localidad: req.body.localidad,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.contraseña, 10), //encripto la contraseña
            categoria: req.body.categoty,
            image: "",
        }

        dbUser.push(usuario);
        fs.writeFileSync("./data/users.json", JSON.stringify(dbUser))
        res.redirect("/")
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
        })
    }
}