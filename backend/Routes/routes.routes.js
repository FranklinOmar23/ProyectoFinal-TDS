import express from "express";
import { obtenerDatosConexion } from "../Controller/prueba.js";
import {UsuarioController} from "../Controller/UsuarioController.js"
import {MultaController} from "../Controller/MultaController.js"
import {RequerimientoController} from "../Controller/requerimientoController.js";


const router = express.Router();
const usuario = new UsuarioController();
const multa = new MultaController();
const requerimiento = new RequerimientoController();
/*const newpassword = generarContraseñaTemporal(9);*/

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

/*router.get("/newpassword",(rq,rs)=>{
    usuario.updateUserByNewPassword(rq,rs)
})*/
router.post('/multaAgente', (req, res) => multa.getMultaByUser(req, res));

router.post("/register", (req, res) => {
    usuario.registerUser(req, res);
});

router.get('/agents', (req, res) => usuario.getAllAgents(req, res));
router.get('/allmultas', (req, res) => multa.getAllMultas(req, res));
router.get('/updateAgent', (req, res) => usuario.updateAgentDetails(req, res));
router.post("/user/:id", (req, res) => { 
    usuario.updateUser(req, res);
});

router.post('/userimage/:id', (req, res) => {
    usuario.uploadAndStoreImage(req, res);
});

router.post('/vehicleimage/:id', (req, res) => {
    usuario.uploadAndStoreImageVehicle(req, res);
});

  
export default router;