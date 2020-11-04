const db = require("../database/models");
const {
    Op
} = require("sequelize");

module.exports = {

    home: function(req, res, next) {

        let categorias;
        let mostrar;
        let catalogo;

        res.render('index', {
            title: "Agile Food",
            css: "index",
            usuario: req.session.usuario
        });
    },

    search: function(req, res, next) {
        let buscar = req.query.search;

        let categorias = [];
        let productos;

        db.productos.findAll({
                //findAll para buscar todos los datos registrados en la tabla
                where: {
                    //dentro del (where) pasmos los atributos de acuerdo  con la columna de la tabla
                    //y el valor a buscar.
                    nombre: {
                        [Op.substring]: buscar
                    }
                },
                include: [{
                    association: "categorias",
                }],
            }).then(result => { //then=(luego) el codigo consecuencia //el(then) ejecuta una promesa

                productos = result;
                productos.forEach(elemento => {
                    if (!categorias.includes(elemento.categorias.nombre)) {
                        categorias.push(elemento.categorias.nombre)
                    }
                })
                res.render('Productos', {
                    title: "Resultado de la búsqueda",
                    categorias: categorias,
                    productos: productos,
                    css: "Productos",
                    usuario: req.session.usuario
                })
            })
            .catch(error => {
                res.send(error)
            })
    }
}