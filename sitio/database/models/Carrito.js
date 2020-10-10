module.exports = (sequelize,dataTypes) => {
    let alias = "Carrito";
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
        tableName: "Carrito",
        timestamps: false
    }

    const Carrito = sequelize.define(alias,cols,config)

    return Carrito

}