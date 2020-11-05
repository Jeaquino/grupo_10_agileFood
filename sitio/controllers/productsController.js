// requiero la base de datos de productos
//requiere todos los modelos
const db = require("../database/models");

// requiero complementos
const sequelize = db.sequelize;
const path = require('path');
const { validationResult } = require("express-validator");

module.exports = {

    detalle: function(req, res, next) {

        let id = req.params.id;

        db.productos.findOne({
            //permite que busquemos resultados que cohincidan con los atributos indicados en el objeto
            //literal que recibe el metodo
            where: {
                idProducto: id
            }
        }).then(producto => {
            //then=(luego) el codigo consecuencia. el(then) ejecuta una promesa
            db.productos.findAll({
                    //findAll para buscar todos los datos registrados en la tabla
                    where: {
                        //dentro del (where) pasmos los atributos de acuerdo  con la columna de la tabla
                        //y el valor a buscar.
                        idCategoria: producto.idCategoria
                    }
                }).then(recomendacion => {
                    //then=(luego) el codigo consecuencia. el(then) ejecuta una promesa
                    res.render('detailProducts', {
                        title: producto.nombre,
                        producto: producto,
                        recomendaciones: recomendacion,
                        css: "detailProducts",
                        usuario: req.session.usuario
                    })
                })
                .catch(error => { //cuando las (promesas) Fallan,podemos atrapar todas las fallas con un (.catch)
                    res.send(error)
                })
        })
    },

    productos: function(req, res, next) {

        let categorias = [];
        let productos = [];

        db.productos.findAll({
                //findAll para buscar todos los datos registrados en la tabla
                include: [{
                        association: "clasificaciones"
                    },
                    {
                        association: "categorias"
                    }
                ]
            })
            //el(then) ejecuta una promesa
            .then(elementos => {
                productos = elementos
                productos.forEach(elemento => {
                    if (!categorias.includes(elemento.categorias.nombre)) {
                        categorias.push(elemento.categorias.nombre)
                    }
                })
                res.render('productos', {
                    title: "Productos",
                    categorias: categorias,
                    productos: productos,
                    css: "Productos",
                    usuario: req.session.usuario
                })
            })
            //cuando las (promesas) Fallan,podemos atrapar todas las fallas con un (.catch)
            .catch(error => {
                res.send(error)
            })

    },
    /*para agregar producto */
    agregar: function(req, res, next) {
        /*definino que es un array para saber que elementos tiene que agarrar */
        /*se hace una caja asi se guardan todos los elementos */
        let categorias = [];
        let clasificaciones = [];

        //findAll es el metodo de encontrar todo
        db.clasificaciones.findAll().then(resultado => {
            // se realiza la busqueda de todas las clasificaciones en la base de datos y se guarda el resultado en clasificaciones
            clasificaciones = resultado
            db.categorias.findAll().then(elementos => {
                // se realiza la busqueda de todas las categorias en la base de datos y se guarda el resultado en categorias
                categorias = elementos
                    //se renderiza la vista, enviando como variables la vista, el archivo css a vincular, el titulo de la vista, la session del usuario si es que existe, los resultados de categorias y clasificaciones. Que precisa la vista para ser dinamica
                res.render('formularioAgregarProducto', {
                        title: "Agregar producto",
                        css: "formularioAgregarProducto",
                        usuario: req.session.usuario,
                        categorias: categorias,
                        clasificaciones: clasificaciones,
                    })
                    //cuando las (promesas) Fallan,podemos atrapar todas las fallas con un (.catch)
            }).catch(error => {
                res.send(error)
            })
        }).catch(error => {
            res.send(error)
        })
    },

    carrito: function(req, res, next) {

        res.render('carritoDeCompras', {
            css: "carritoDeCompras",
            title: "carrito de compras",
            usuario: req.session.usuario
        });
    },

    crear: function(req, res, next) {

        let errores = validationResult(req);

        if (errores.isEmpty()) {

            db.productos.create({
                    nombre: req.body.nombre.trim(),
                    precio: req.body.precio.trim(),
                    descuento: req.body.descuento.trim(),
                    idCategoria: req.body.categoria,
                    idClasificacion: req.body.clasificacion,
                    stock: req.body.stock.trim(),
                    descripcion: req.body.descripcion.trim(),
                    imagen: (req.files[0]) ? req.files[0].filename : "default-image.png"
                }).then(result => { //el(then) ejecuta una promesa
                    res.redirect("/products")
                })
                //cuando las (promesas) Fallan,podemos atrapar todas las fallas con un (.catch)
                .catch(error => {
                    res.send(error)
                })
        } else {
            console.log(errores)
            let categorias = [];
            let clasificaciones = [];

            //findAll es el metodo de encontrar todo
            db.clasificaciones.findAll().then(resultado => {
                // se realiza la busqueda de todas las clasificaciones en la base de datos y se guarda el resultado en clasificaciones
                clasificaciones = resultado
                db.categorias.findAll().then(elementos => {
                    // se realiza la busqueda de todas las categorias en la base de datos y se guarda el resultado en categorias
                    categorias = elementos
                        //se renderiza la vista, enviando como variables la vista, el archivo css a vincular, el titulo de la vista, la session del usuario si es que existe, los resultados de categorias y clasificaciones. Que precisa la vista para ser dinamica
                    res.render('formularioAgregarProducto', {
                            title: "Agregar producto",
                            css: "formularioAgregarProducto",
                            usuario: req.session.usuario,
                            errors: errores.mapped(),
                            inputs: req.body,
                            categorias: categorias,
                            clasificaciones: clasificaciones,
                        })
                        //cuando las (promesas) Fallan,podemos atrapar todas las fallas con un (.catch)
                }).catch(error => {
                    res.send(error)
                })
            }).catch(error => {
                res.send(error)
            })
        }
    },

    form: function(req, res, next) {

        let id = req.params.id
        let categorias = [];
        let clasificaciones = [];

        //findAll es el metodo de encontrar todo
        db.clasificaciones.findAll().then(resultado => {
            // se realiza la busqueda de todas las clasificaciones en la base de datos y se guarda el resultado en clasificaciones
            clasificaciones = resultado
            db.categorias.findAll().then(elementos => {
                // se realiza la busqueda de todas las categorias en la base de datos y se guarda el resultado en categorias
                categorias = elementos
                db.productos.findOne({
                    //permite que busquemos resultados que cohincidan con los atributos indicados en el objeto
                    //literal que recibe el metodo
                    where: {
                        idProducto: id
                    }
                    //Se realiza la busqueda del producto pasado por el parametro id
                }).then(producto => { //then=(luego) el codigo consecuencia //el(then) ejecuta una promesa
                    //se renderiza la vista, enviando como variables la vista, se envian todos los elementos que se buscaron y los necesarios(css title vista) que precisa la vista para ser dinamica
                    res.render('formularioEditarProducto', {
                        title: "Editar producto ",
                        css: "formularioAgregarProducto",
                        usuario: req.session.usuario,
                        categorias: categorias,
                        clasificaciones: clasificaciones,
                        producto: producto,
                    })
                    //cuando las (promesas) Fallan,podemos atrapar todas las fallas con un (.catch)
                }).catch(error => {
                    res.send(error)
                })
            })
        }).catch(error => {
            res.send(error)
        })
    },

    edit: function (req, res, next) {

        let id = req.params.id;
        let errores = validationResult(req);

        if (errores.isEmpty()) {
            db.productos.update({
                    nombre: req.body.nombre.trim(),
                    precio: req.body.precio.trim(),
                    descuento: req.body.descuento.trim(),
                    idCategoria: req.body.categoria,
                    idClasificacion: req.body.clasificacion,
                    stock: req.body.stock.trim(),
                    descripcion: req.body.descripcion.trim(),
                    imagen: (req.files[0]) ? req.files[0].filename : req.body.imagen
                }, {
                    where: {
                        idProducto: id
                    }
                }).then(result => {
                    res.redirect("/products")
                })
                .catch(error => {
                    res.send(error)
                })
        } else {
            console.log(errores)
            let categorias = [];
            let clasificaciones = [];
            let producto;

            //findAll es el metodo de encontrar todo
            db.clasificaciones.findAll().then(resultado => {
                // se realiza la busqueda de todas las clasificaciones en la base de datos y se guarda el resultado en clasificaciones
                clasificaciones = resultado
                db.categorias.findAll().then(elementos => {
                    // se realiza la busqueda de todas las categorias en la base de datos y se guarda el resultado en categorias
                    categorias = elementos
                    //se renderiza la vista, enviando como variables la vista, el archivo css a vincular, el titulo de la vista, la session del usuario si es que existe, los resultados de categorias y clasificaciones. Que precisa la vista para ser dinamica
                    db.productos.findOne({
                        where: {
                            idProducto: id
                        }
                    }).then(elemt => {
                        producto = elemt
                        res.render('formularioEditarProducto', {
                            title: "Editar producto",
                            css: "formularioAgregarProducto",
                            usuario: req.session.usuario,
                            errors: errores.mapped(),
                            inputs: req.body,
                            categorias: categorias,
                            clasificaciones: clasificaciones,
                            producto: producto
                        })
                    }).catch(error => {
                        res.send(error)
                    })
                }).catch(error => {
                    res.send(error)
                })
            }).catch(error => {
                res.send(error)
            })
        }
    },

    eliminar: function(req, res) {
        let id = req.params.id;
        db.productos.destroy({
            where: {
                idProducto: id
            }
        })
        res.redirect('/users/administrador')
    }
}