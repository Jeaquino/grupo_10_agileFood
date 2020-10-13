module.exports = (sequelize,dataTypes) => {
    let alias = "usuarios";
    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull:false,
            autoIncremet: true,
            primaryKey: true,
            unique: true,
            field: "id" 
        },
        nombre:{
            type: dataTypes.STRING(100),
            allowNull:false,
            validate: {
                isAlpha:{
                    args:true,
                    msg:"Por más que seas eleven de stranger things, escribe tu nombre con letras no numeros"
                }
            }
        },
        apellido:{
            type: dataTypes.STRING(100),
            allowNull:false,
            validate: {
                isAlpha:{
                    args:true,
                    msg:"Por más que seas un experimento y tengas un codigo de barras, escribe tu apellido con letras, no uses numeros"
                }
            }
        },
        dni:{
            type: dataTypes.INTEGER(8)
        },
        email:{
            type: dataTypes.STRING(100),
            allowNull:false,
            unique:true
        },
        constrasena:{
            type: dataTypes.STRING(100),
            allowNull:false,
        },
        idDomicilio:{
            type: dataTypes.INTEGER(11)
        },
        categoria:{
            type: dataTypes.STRING(100)
        },
        imagen:{
            type: dataTypes.STRING(100)
        },
    };
    let config = {
        tableName: "usuarios",
        timestamps: false
    }

    const Usuario = sequelize.define(alias,cols,config)

    Usuario.associate = function(models) {

        Usuario.belongsToMany(models.productos, {
            as: 'producto',
            through: "carritos",
            foreignKey: "id",
            otherKey: "idProducto",
            timestamps: false
        })

        Usuario.hasMany(models.domicilios, {
            as: "domicilio",
            ForeignKey: "id",
        })
    }
        

    return Usuario

}