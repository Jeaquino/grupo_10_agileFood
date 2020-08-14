const dbProduct = require("../data/database");

module.exports = {

home:function(req, res, next) {

    let categorias;
    let mostrar;
    let catalogo;

  /*   dbProduct.forEach(producto => {
        if (!categorias.includes(producto.category)){
            categorias.push(producto.category)
        }
    })
*/
  /*  categorias.forEach(categoria => {
        catalogo.push(dbProducts.filter(producto => {
            return producto.category == categoria
        }))
    })
*/
    res.render('index', { 
        title: "Agile Food",
        css:"index",
    //    categorias: categorias,
    //    catalogo: catalogo,  
    });
    }
}