import React,{useState} from "react";
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/adicciones.css";
import "../Css/nuevamulta.css";
import Footer from './Comp_Helpers/Footer.jsx';
import Navbar from "./Comp_Helpers/Navbar";
import Topbar from "./Comp_Helpers/Topbar";
import NmCedDes from "./Comp_Helpers/nuevamultaCedDes.jsx";
import NmDatosCon from "./Comp_Helpers/nuevamultaDatosContainer.jsx";
import NmOtroCon from "./Comp_Helpers/nuevamultaOtrosDetallesContainer.jsx";

function Nuevamulta () {
    const [nombre, setNombre] = useState('');
  
    return (
        <>
        <div id="page-top"></div>
        <div id="wrapper">
            <Navbar />
            <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <Topbar titulo="Asignación de Multas"/>
                <div className="container-fluid">
                    <h3 className="text-dark mb-4">Nueva Multa</h3>
                    <div className="row mb-3">
                        <NmCedDes setNombre={setNombre} />
                        <div className="col-lg-8">
                        <NmDatosCon nombre={nombre} />
                            <NmOtroCon />
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
            </div>
        </div>
        </>
    );
}

export default Nuevamulta;