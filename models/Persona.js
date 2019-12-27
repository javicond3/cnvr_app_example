// Definicion del modelo Persona:

module.exports = function (sequelize, DataTypes) {
  const Persona = sequelize.define('Persona',
    {
      identificador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
     
    },
    {
      timestamps: false,
    });
  Persona.removeAttribute('id');
  return Persona;
};

