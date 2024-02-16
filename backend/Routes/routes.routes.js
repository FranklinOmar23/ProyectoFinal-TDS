import express from "express";
import { obtenerDatosConexion } from "../Controller/prueba.js";
import {UsuarioController} from "../Controller/UsuarioController.js"
import {generarContraseñaTemporal} from '../logic/genrarContraseña.js'

const router = express.Router();
const usuario = new UsuarioController();
const newpassword = generarContraseñaTemporal(9);

router.get("/conexion",  obtenerDatosConexion);

router.get("/user",(rq, rs)=>{
    usuario.getAllUsers(rq,rs)
});
console.log(newpassword);

router.post('/login', (req, res) => usuario.login(req, res));

router.get("/newpassword",(rq,rs)=>{
    usuario.updateUserByNewPassword(rq,rs)
})
  
export default router;