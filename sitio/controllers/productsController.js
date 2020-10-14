// requiero la base de datos de productos

const dbProduct = require("../data/database");
const db = require("../database/models");

// requiero complementos
const sequelize = db.sequelize;
const fs = require("fs");
const path = require('path');
const {
    validationResult
} = require("express-validator");

module.exports = {

    detalle: function (req, res, next) {

        let id = req.params.id;

        let productoElegido = db.productos.findOne({
                where: {
                    idProducto: id
                }
            })
            .catch(error => {
                console.log(productoElegido)
                res.send(error)
            })

        let recomendaciones = db.productos.findAll({
            where: {
                idCategoria: productoElegido.dataValues.idCategoria
            }
        })

        res.render('detailProducts', {
            title: productoElegido.name,
            producto: productoElegido,
            recomendaciones: recomendaciones,
            css: "detailProducts",
            usuario: req.session.usuario
        });
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
                    idCategoria: req.body.categoria.trim(),
                    clasificacion: req.body.clasificacion.trim(),
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

        let product;
        dbProduct.forEach(producto => {
            if (producto.id == id) {
                product = producto
            }
        })
        res.render("formularioEditarProducto", {
            producto: product,
            title: "Modificar producto",
            css: "formularioAgregarProducto",
            usuario: req.session.usuario
        })
    },

    edit: function (req, res, next) {
        let idProducto = req.params.id;

        dbProduct.forEach(producto => {
            if (producto.id == idProducto) {
                producto.id = idProducto;
                producto.name = req.body.nombre;
                producto.price = req.body.precio;
                producto.discount = req.body.discount;
                producto.category = req.body.categoria;
                producto.classification = req.body.clasificacion;
                producto.score = [];
                producto.stock = req.body.stock;
                producto.description = req.body.description;
                producto.image = (req.files[0]) ? req.files[0].filename : producto.image
            }
        })

        fs.writeFileSync(path.join(__dirname, "../data/productsDataBase.json"), JSON.stringify(dbProduct))
        res.redirect("/products")

    },
    eliminar: function (req, res) {
        let idProducto = req.params.id;
        dbProduct.forEach(producto => {
            if (producto.id == idProducto) {
                let aEliminar = dbProduct.indexOf(producto);
                dbProduct.splice(aEliminar, 1);
            }
        })
        fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dbProduct));
        res.redirect('/users/administrador')
    }
}