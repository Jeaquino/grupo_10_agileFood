module.exports = (sequelize,dataTypes) => {
    let alias = "usuarios";
    let cols = {
        idUsuario:{
            type: dataTypes.INTEGER(11),
            allowNull:true,
            autoIncremet: true,
            primaryKey: true,
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
        contrasena:{
            type: dataTypes.STRING(100),
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
            foreignKey: "idProducto",
            otherKey: "idUsuario",
            timestamps: false
        })

        Usuario.hasMany(models.domicilios, {
            as: "domicilios",
            ForeignKey: "idUsuario",
        })
    }
        

    return Usuario

}