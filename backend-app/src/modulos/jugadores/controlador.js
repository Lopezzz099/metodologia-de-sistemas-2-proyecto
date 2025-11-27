const crearError = require("../../middleware/errors");

const TABLA = "jugadores";

module.exports = function (dbInyectada) {
  let db = dbInyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }

  function obtenerJugadores() {
    return db.todos(TABLA);
  }

  function porNombre(nombre) {
    return db.query(`SELECT * FROM ${TABLA} WHERE nombre LIKE ?`, [
      `%${nombre}%`,
    ]);
  }

  function porEquipo(equipo) {
    return db.query(`SELECT * FROM ${TABLA} WHERE equipo LIKE ?`, [
      `%${equipo}%`,
    ]);
  }

  function insertar(body) {
    return db.insertar(TABLA, body);
  }

  function actualizar(body) {
    return db.actualizar(TABLA, body);
  }

  function uno(id) {
    return db.uno(TABLA, id);
  }

  async function eliminar(id) {
    const existe = await db.uno(TABLA, id);
    if (!existe || existe.length === 0) {
      throw crearError(`No existe equipo con id ${id}`, 404);
    }
    const resultado = await db.eliminar(TABLA, id);
    if (resultado.affectedRows === 0) {
      throw crearError(`No se eliminó registro con id ${id}`, 404);
    }
    return resultado;
  }

  return {
    obtenerJugadores,
    uno,
    eliminar,
    insertar,
    actualizar,
    porNombre,
    porEquipo,
  };
};
