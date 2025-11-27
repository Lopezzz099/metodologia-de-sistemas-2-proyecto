const express = require("express");
const router = express.Router();
const respuestas = require("../../red/respuestas");
const controlador = require("./index");

router.get("/", obtenerPartidos);
router.get("/liga/:liga", porLiga);
router.get("/equipo/:nombreEquipo", porEquipo);
router.get("/fecha/:fechaInicio/:fechaFin", porRangoFecha);
router.get("/:id", uno);
router.put("/", actualizar);
router.delete("/:id", eliminar);
router.post("/", insertar);

async function obtenerPartidos(req, res, next) {
  try {
    const lista = await controlador.obtenerPartidos();
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

async function porLiga(req, res, next) {
  try {
    const lista = await controlador.porLiga(req.params.liga);
    respuestas.success(req, res, lista, 200);
  } catch (err) {
    next(err);
  }
}

async function porEquipo(req, res, next) {
  try {
    const lista = await controlador.porEquipo(req.params.nombreEquipo);
    respuestas.success(req, res, lista, 200);
  } catch (err) {
    next(err);
  }
}

async function porRangoFecha(req, res, next) {
  try {
    const lista = await controlador.porRangoFecha(
      req.params.fechaInicio,
      req.params.fechaFin
    );
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
