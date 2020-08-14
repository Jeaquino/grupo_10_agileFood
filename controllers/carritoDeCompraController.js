module.exports = {
    index : (req, res, next) =>{
        res.render('carritoDeCompra', {css: "carrito", title: "Carro de compras"});
    }
}