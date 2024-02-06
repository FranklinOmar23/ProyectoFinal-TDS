import express from "express";
import { obtenerDatosConexion } from "../Controler/prueba.js";

const router = express.Router();

router.get("/conexion", obtenerDatosConexion);

export default router;