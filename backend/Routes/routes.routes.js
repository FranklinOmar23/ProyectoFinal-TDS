import express from "express";
import { obtenerDatosConexion } from "../Controller/prueba.js";
import {UsuarioController} from "../Controller/UsuarioController.js"
import {MultaController} from "../Controller/MultaController.js"
import {RequerimientoController} from "../Controller/requerimientoController.js";


const router = express.Router();
const usuario = new UsuarioController();
const multa = new MultaController();
const requerimiento = new RequerimientoController();

router.get("/conexion",  obtenerDatosConexion);

router.get("/user",(rq, rs)=>{
    usuario.getAllUsers(rq,rs)
});

router.get("/requerimiento",(rq, rs)=>{
    requerimiento.getAllRequerimientos(rq,rs)
});

router.post('/login', (req, res) => usuario.login(req, res));
router.post('/reset-password', (req, res) => usuario.updateUserByNewPassword(req, res));
router.post('/getUserNameByCedula', (req, res) => usuario.getUserNameByCedula(req, res));
router.post('/createMulta', (req, res) => multa.createMulta(req, res));

router.post('/multaAgente', (req, res) => multa.getMultaByUser(req, res));

router.post("/register", (req, res) => {
    usuario.registerUser(req, res);
});

export default router;