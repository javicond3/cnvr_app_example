const path = require('path');
const Sequelize = require('sequelize');


// Cargar ORM

//    DATABASE_URL = postgres://user:passwd@host:port/database
const password = process.env.DB_PASSWORD || "1234";
const user = process.env.DB_USER || "cnvr";
const database = "cnvr";
let host = process.env.HOST
console.log("Host: ", host)

const sequelize = new Sequelize(`postgres://${user}:${password}@${host}:5432/${database}`);
// Importar la definicion de las tablas
const Persona = sequelize.import(path.join(__dirname, 'Persona'));
exports.Persona = Persona; // exportar definición de tabla Persona

sequelize.sync();

exports.getPersonas = async function () {
  let personas = [];
  try {
    personas = await Persona.findAll({
      raw: true,
    })
    return personas;
  } catch (error) {
    // se propaga el error lo captura el middleware
    throw error;
  }
}

exports.addPersona = async function (nombre) {
  try {
    const persona = Persona.build(
      {nombre:nombre}
    );
    // se guarda en la bbdd la nueva persona
    await persona.save();
  } catch (error) {
    // se propaga el error lo captura el middleware
    throw error;
  }
}
