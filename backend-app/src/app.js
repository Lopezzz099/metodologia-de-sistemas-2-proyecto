const express = require("express");
const config = require("./config");
const app = express();
const morgan = require("morgan");
const error = require("./red/errors");
const equipos = require("./modulos/equipos/rutas");
const jugadores = require("./modulos/jugadores/rutas");
const partidos = require("./modulos/partidos/rutas");

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middlewares

//configuracion
app.set("port", config.app.port);

//rutas
app.use("/api/equipos", equipos);
app.use("/api/jugadores", jugadores);
app.use("/api/partidos", partidos);

app.use(error);

module.exports = app;
