// requiero la base de datos de productos

const dbProduct = require("../data/database");
const db = require("../database/models");

// requiero complementos
const sequelize = db.sequelize;
const path = require('path');
const {validationResult} = require("express-validator");

module.exports = {

    detalle: function (req, res, next) {

        let id = req.params.id;

        db.productos.findOne({
            where: {
                idProducto: id
            }
        }).then(producto => {
            db.productos.findAll({
                    where: {
                        idCategoria: producto.idCategoria
                    }
                }).then(recomendacion => {
                    res.render('detailProducts', {
                        title: producto.nombre,
                        producto: producto,
                        recomendaciones: recomendacion,
                        css: "detailProducts",
                        usuario: req.session.usuario
                    })
                })
                .catch(error => {
                    res.send(error)
                })
        })
    },

    productos: function (req, res, next) {

        let categorias;
        db.categorias.findAll({
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
                include: [{
                    association: "categorias"
                }]
            })
            .then(elementos => {
                productos = elementos
                res.render('Productos', {
                    title: "Productos",
                    categorias: categorias,
                    productos: productos,
                    css: "Productos",
                    usuario: req.session.usuario
                })
            })
            .catch(error => {
                res.send(error)
            })

    },

    agregar: function (req, res, next) {

        const db = require("../database/models");
        db.categorias.findAll()
            .then(send => {
                console.log(send)
                res.render('formularioAgregarProducto', {
                    title: "Agregar producto",
                    css: "formularioAgregarProducto",
                    usuario: req.session.usuario,
                    categorias: send
                })
            })
            .catch(error => {
                res.send(error)
            });
    },

    carrito: function (req, res, next) {

        res.render('carritoDeCompras', {
            css: "carritoDeCompras",
            title: "carrito de compras",
            usuario: req.session.usuario
        });
    },

    crear: function (req, res, next) {

        let errores = validationResult(req);

        if (errores.isEmpty()) {

            db.productos.create({
                    nombre: req.body.nombre.trim(),
                    precio: req.body.precio.trim(),
                    descuento: req.body.descuento.trim(),
                    idCategoria: req.body.categoria,
                    clasificacion: req.body.clasificacion,
                    stock: req.body.stock.trim(),
                    descripcion: req.body.descripcion.trim(),
                    imagen: (req.files[0]) ? req.files[0].filename : "default-image.png"
                })
                .then(res.redirect("/products"))
                .catch(error => {
                    res.send(error)
                })
        } else {
            res.render("formularioAgregarProducto", {
                css: "formularioAgregarProducto",
                title: "Agregar producto",
                errors: errors.mapped(),
                inputs: req.body,
                usuario: req.session.usuario
            })
        }
    },

    form: function (req, res, next) {

        let id = req.params.id

        db.productos.findOne({
            where: {
                idProducto: id
            }
        }).then(elemento => {
            res.render("formularioEditarProducto", {
                producto: elemento,
                title: "Modificar producto",
                css: "formularioAgregarProducto",
                usuario: req.session.usuario
            })
        })
        .catch(error => {
            res.send(error)
        })
    },

    edit: function (req, res, next) {
        let id = req.params.id;

        db.productos.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descuento: req.body.discount,
            categoria: req.body.categoria,
            clasificacion: req.body.clasificacion,
            stock: req.body.stock,
            descripcion: req.body.description,
            imagen: (req.files[0]) ? req.files[0].filename : producto.image
        }, {
            where: {
                idProducto: id
            }
        })

        res.redirect("/products")
    },

    eliminar: function (req, res) {
        let id = req.params.id;
        db.productos.destroy({
            where: {
                idProducto: id
            }
        })
        res.redirect('/users/administrador')
    }
}