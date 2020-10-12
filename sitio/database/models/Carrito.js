module.exports = (sequelize,dataTypes) => {
    let alias = "usuario_producto";
    let cols = {
        idcarrito:{
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

    const Carrito = sequelize.define(alias,cols,config)

    return Carrito

}