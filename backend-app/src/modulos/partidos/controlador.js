const crearError = require("../../middleware/errors");

const TABLA = "partidos";

module.exports = function (dbInyectada) {
  let db = dbInyectada;
  if (!db) {
    db = require("../../DB/mysql");
  }

  function obtenerPartidos() {
    return db.todos(TABLA);
  }

  function porLiga(liga) {
    return db.query(`SELECT * FROM ${TABLA} WHERE liga LIKE ?`, [`%${liga}%`]);
  }

  function porEquipo(nombreEquipo) {
    return db.query(
      `SELECT * FROM ${TABLA} WHERE equipo1 LIKE ? OR equipo2 LIKE ?`,
      [`%${nombreEquipo}%`, `%${nombreEquipo}%`]
    );
  }

  function porRangoFecha(fechaInicio, fechaFin) {
    return db.query(`SELECT * FROM ${TABLA} WHERE fecha BETWEEN ? AND ?`, [
      fechaInicio,
      fechaFin,
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
    obtenerPartidos,
    uno,
    eliminar,
    insertar,
    actualizar,
    porLiga,
    porEquipo,
    porRangoFecha,
  };
};
