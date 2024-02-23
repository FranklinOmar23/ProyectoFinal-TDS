import express from "express";
import { obtenerDatosConexion } from "../Controller/prueba.js";
import {UsuarioController} from "../Controller/UsuarioController.js"
import {MultaController} from "../Controller/MultaController.js"


const router = express.Router();
const usuario = new UsuarioController();
const multa = new MultaController();
/*const newpassword = generarContraseñaTemporal(9);*/

router.get("/conexion",  obtenerDatosConexion);

router.get("/user",(rq, rs)=>{
    usuario.getAllUsers(rq,rs)
});
/*console.log(newpassword);*/

router.post('/login', (req, res) => usuario.login(req, res));
router.post('/reset-password', (req, res) => usuario.updateUserByNewPassword(req, res));
router.post('/getUserNameByCedula', (req, res) => usuario.getUserNameByCedula(req, res));
router.post('/createMulta', (req, res) => multa.createMulta(req, res));

/*router.get("/newpassword",(rq,rs)=>{
    usuario.updateUserByNewPassword(rq,rs)
})*/
  
export default router;