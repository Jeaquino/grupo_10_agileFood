module.exports = (sequelize,dataTypes) => {
    let alias = "usuario_producto";
    let cols = {
        idCarrito:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        idUsuario:{
            type: dataTypes.INTEGER
        },
        idProducto:{
            type: dataTypes.INTEGER
        },
    };

    let config = {
        tableName: "usuario_producto",
        timestamps: false
    }

    const usuario_producto = sequelize.define(alias,cols,config)

    return Carrito

}