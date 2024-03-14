import React from 'react';
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/admcss.css";

import Footer from './Comp_Helpers/Footer.jsx';
import Navbaradm from './Comp_Helpers/Navbaradm.jsx';
import Topbar from './Comp_Helpers/Topbar.jsx';
import ChatClient from './Comp_Helpers/cardChat.jsx';
import { Map } from './Home.jsx';


function Nuevomsg(){
    return (
        <>
             <div id="page-top"></div>
        <div id="wrapper">
            <Navbaradm />
            <div className="d-flex flex-column" id="content-wrapper">
                <Topbar titulo="Crear Notificaciones"/>
                <div className="container">
                <div className="row">
                        <Map />
                        <ChatClient />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
        </>
    )
}

export default Nuevomsg;