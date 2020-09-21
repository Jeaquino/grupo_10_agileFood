const dbProduct = require("../data/database");

module.exports = {

    home: function (req, res, next) {

        let categorias;
        let mostrar;
        let catalogo;

        res.render('index', {
            title: "Agile Food",
            css: "index",
            usuario: req.session.usuario
        });
    },
    search: function (req, res) {
        let buscar = req.query.search;
        let productos = [];

        seccion = dbProduct.filter(producto => {
            return producto.name.toLowerCase().includes(buscar)
        })
        productos.push({
            categoria: "los resultados para su buqueda de '" + buscar + "' son:",
            productos: seccion
        });

res.render('Productos', {
    title: "Resultado de la búsqueda",
    productos: productos,
    css: "Productos",
    usuario: req.session.usuario
})
}
}