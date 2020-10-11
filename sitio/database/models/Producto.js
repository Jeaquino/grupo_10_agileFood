module.exports = (sequelize,dataTypes) => {
    let alias = "productos";
    let cols = {
        idProducto:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        nombre:{
            type: dataTypes.STRING
        },
        precio:{
            type: dataTypes.DECIMAL
        },
        descuento:{
            type: dataTypes.INTEGER
        },
        categoria:{
            type: dataTypes.STRING
        },
        clasificacion:{
            type: dataTypes.STRING
        },
        puntaje:{
            type: dataTypes.DECIMAL
        },
        stock:{
            type: dataTypes.INTEGER
        },
        descripcion:{
            type: dataTypes.STRING
        },
        imagen:{
            type: dataTypes.STRING
        },
    };

    let config = {
        tableName: "productos",
        timestamps: false
    }

    const Producto = sequelize.define(alias,cols,config)

    Producto.associate = function(models) {

        Producto.belongsToMany(models.usuarios, {
            as: 'usuarios',
            through: "carrito",
            foreignKey: "idProducto",
            otherKey: "idUsuario",
            timestamps: false
        })
    }

    return Producto

}