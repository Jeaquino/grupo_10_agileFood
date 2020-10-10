module.exports = (sequelize,dataTypes) => {
    let alias = "Domicilios";
    let cols = {
        idDomicilio:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true
        },
        idUsuario:{
            type: dataTypes.INTEGER
        },
        calle:{
            type: dataTypes.DECIMAL
        },
        altura:{
            type: dataTypes.INTEGER
        },
        departamento:{
            type: dataTypes.STRING
        },
        localidad:{
            type: dataTypes.STRING
        },
        provincia:{
            type: dataTypes.STRING
        },
        pais:{
            type: dataTypes.STRING
        },
        descripcion:{
            type: dataTypes.STRING
        },
        codigoPostal:{
            type: dataTypes.INTEGER
        },
    };

    let config = {
        tableName: "Domicilios",
        timestamps: false
    }

    const Domicilio = sequelize.define(alias,cols,config)

    return Domcilio

}