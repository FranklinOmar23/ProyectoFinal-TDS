import React from "react";
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

    return (
        <>
        <div id="page-top"></div>
        <div id="wrapper">
            <Navbar />
            <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <Topbar titulo="Asignación de Multas"/>
                <div class="container-fluid">
                    <h3 class="text-dark mb-4">Nueva Multa</h3>
                    <div class="row mb-3">
                        <NmCedDes />
                        <div class="col-lg-8">
                            <NmDatosCon />
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