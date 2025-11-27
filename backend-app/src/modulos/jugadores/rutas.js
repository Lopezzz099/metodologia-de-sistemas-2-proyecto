const express = require("express");
const router = express.Router();
const respuestas = require("../../red/respuestas");
const controlador = require("./index");

router.get("/", obtenerJugadores);
router.get("/nombre/:nombre", porNombre);
router.get("/equipo/:equipo", porEquipo);
router.get("/:id", uno);
router.put("/", actualizar);
router.delete("/:id", eliminar);
router.post("/", insertar);

async function obtenerJugadores(req, res, next) {
  try {
    const lista = await controlador.obtenerJugadores();
    respuestas.success(req, res, lista, 200);
  } catch (err) {
    next(err);
  }
}

async function insertar(req, res, next) {
  try {
    await controlador.insertar(req.body);
    respuestas.success(req, res, "Item agregado satisfactoriamente", 201);
  } catch (err) {
    next(err);
  }
}

async function actualizar(req, res, next) {
  try {
    await controlador.actualizar(req.body);
    respuestas.success(req, res, "Item actualizado satisfactoriamente", 201);
  } catch (err) {
    next(err);
  }
}

async function uno(req, res, next) {
  try {
    const item = await controlador.uno(req.params.id);
    respuestas.success(req, res, item, 200);
  } catch (err) {
    next(err);
  }
}

async function porNombre(req, res, next) {
  try {
    const lista = await controlador.porNombre(req.params.nombre);
    respuestas.success(req, res, lista, 200);
  } catch (err) {
    next(err);
  }
}

async function porEquipo(req, res, next) {
  try {
    const lista = await controlador.porEquipo(req.params.equipo);
    respuestas.success(req, res, lista, 200);
  } catch (err) {
    next(err);
  }
}

async function eliminar(req, res, next) {
  try {
    await controlador.eliminar(Number(req.params.id));
    respuestas.success(req, res, "Item eliminado satisfactoriamente", 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
