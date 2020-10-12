module.exports = (sequelize,dataTypes) => {
    let alias = "productos";
    let cols = {
        idProducto:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        nombre:{
            type: dataTypes.STRING(100)
        },
        precio:{
            type: dataTypes.DECIMAL(10,2)
        },
        descuento:{
            type: dataTypes.INTEGER
        },
        categoria:{
            type: dataTypes.STRING(100)
        },
        clasificacion:{
            type: dataTypes.STRING(100)
        },
        puntaje:{
            type: dataTypes.DECIMAL(2,2)
        },
        stock:{
            type: dataTypes.INTEGER
        },
        descripcion:{
            type: dataTypes.STRING(300)
        },
        imagen:{
            type: dataTypes.STRING(100)
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
            through: "usuario_producto",
            foreignKey: "idProducto",
            otherKey: "idUsuario",
            timestamps: false
        })
    }

    return Producto

}