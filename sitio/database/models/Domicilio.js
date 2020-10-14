module.exports = (sequelize,dataTypes) => {
    let alias = "domicilios";
    let cols = {
        idDomicilio:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        calle:{
            type: dataTypes.INTEGER(8)
        },
        altura:{
            type: dataTypes.INTEGER(100)
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
            type: dataTypes.INTEGER(8)
        },
        idUsuario:{
            type: dataTypes.INTEGER
        },
    };

    let config = {
        tableName: "domicilios",
        timestamps: false
    }

    const Domicilio = sequelize.define(alias,cols,config)

    Domicilio.associate = function(models) {

        Domicilio.belongsTo(models.usuarios, {
            as: "usuarios",
            ForeignKey: "idUsuario",
        })
    }

    return Domicilio

}