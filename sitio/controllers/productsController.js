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

        let productoElegido;

        dbProduct.forEach(producto => {
            if (producto.id == id) {
                productoElegido = producto
            }
        })

        let recomendaciones = dbProduct.filter(producto => {
            return producto.category == productoElegido.category
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

        res.render('Productos', {
            title: "Productos",
            categorias: categorias,
            productos: productos,
            css: "Productos",
            usuario: req.session.usuario
        });
    },

    agregar: function (req, res, next) {

        res.render('formularioAgregarProducto', {
            title: "Agregar producto",
            css: "formularioAgregarProducto",
            usuario: req.session.usuario
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
                name: req.body.nombre,
                precio: req.body.precio,
                descuento: req.body.descuento,
                categoria: req.body.categoria,
                clasificacion: req.body.clasificacion,
                stock: req.body.stock,
                descripcion: req.body.descripcion,
                imagen: (req.files[0]) ? req.files[0].filename : "default-image.png"
            })
            .then(producto => {
                console.log(producto)
                res.redirect("/products")
            })
            .catch(errror => {
                res.send(error)
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