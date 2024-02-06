import express from "express";
import { obtenerDatosConexion } from "../Controller/prueba.js";
import {UsuarioController} from "../Controller/UsuarioController.js"

const router = express.Router();




router.get("/conexion",(rq, rs)=>{
    const usuario = new UsuarioController();
    usuario.getAllUsers(rq,rs)
});


export default router;