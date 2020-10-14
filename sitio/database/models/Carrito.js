module.exports = (sequelize,dataTypes) => {
    let alias = "carritos";
    let cols = {
        idcarrito:{
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncremet: true
        },
        idUsuario:{
            type: dataTypes.INTEGER(11)
        },
        idProducto:{
            type: dataTypes.INTEGER(11)
        },
    };

    let config = {
        tableName: "carritos",
        timestamps: false
    }

    const Carrito = sequelize.define(alias,cols,config)

    return Carrito

}