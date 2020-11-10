module.exports = (sequelize,dataTypes) => {
    let alias = "domicilios";
    let cols = {
        idDomicilio:{
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncremet: true
        },
        idUsuario:{
            type: dataTypes.INTEGER(11)
        },
        calle:{
            type: dataTypes.STRING(100)
        },
        altura:{
            type: dataTypes.INTEGER(11)
        },
        departamento:{
            type: dataTypes.STRING(100)
        },
        localidad:{
            type: dataTypes.STRING(100)
        },
        provincia:{
            type: dataTypes.STRING(100)
        },
        pais:{
            type: dataTypes.STRING(100)
        },
        descripcion:{
            type: dataTypes.STRING(100)
        },
        codigoPostal:{
            type: dataTypes.INTEGER(11)
        },
    };

    let config = {
        tableName: "domicilios",
        timestamps: false
    }

    let Domicilio = sequelize.define(alias,cols,config)

    Domicilio.associate = function(models) {

        Domicilio.belongsTo(models.usuarios, {
            as: "usuarios",
            foreignKey: "idUsuario",
        })
    }

    return Domicilio

}