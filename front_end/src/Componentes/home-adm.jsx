import React, { useState, useRef, useEffect } from 'react';
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/admcss.css";
import axios from 'axios';

import Footer from './Comp_Helpers/Footer.jsx';
import Navbaradm from './Comp_Helpers/Navbaradm.jsx';
import Topbar from './Comp_Helpers/Topbar.jsx';

function HomeAdm() {
  const [isChecked, setIsChecked] = useState(true);
  const [agents, setAgents] = useState([]); // Estado para almacenar los agentes

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Función para obtener los datos de los agentes
  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/agents'); // Asegúrate de cambiar la URL por la correcta de tu backend
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  // Llama a fetchAgents cuando el componente se monta
  useEffect(() => {
    fetchAgents();
  }, []);
  return (
    <>
      <div id="page-top"></div>
      <div id="wrapper">
        <Navbaradm />
        <div className="d-flex flex-column" id="content-wrapper">
          <Topbar titulo="Administracion" />
          <div className="card-header py-3">
            <div class="inputBox">
              <input required="" type="text"/>
              <i class="fa-solid fa-magnifying-glass"></i>
                <span>BUSCAR...</span>
            </div></div>
            <div className="card-body">
              <div className="table-responsive text-center table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
                <table className="table table-striped table-bordered my-0" id="dataTable">
                  <thead>
                    <tr>
                      <th className="text-center titulo">CÉDULA</th>
                      <th className="text-center titulo">NOMBRE</th>
                      <th className="text-center titulo">APELLIDO</th>
                      <th className="text-center titulo">ESTADO</th>
                      <th className="text-center titulo">HORARIO ENTRADA</th>
                      <th className="text-center titulo">HORARIO SALIDA</th>
                      <th className="text-center titulo">SALARIO</th>
                      <th className="text-center titulo">CORREO</th>
                      <th className="text-center titulo">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent, index) => (
                      <tr key={index}>
                        <td>{agent.cedula}</td>
                        <td>{agent.nombre}</td>
                        <td>{agent.apellido}</td>
                        <td>{agent.estado}</td>
                        <td>{agent.horario_entrada}</td>
                        <td>{agent.horario_salida}</td>
                        <td>{agent.salario}</td>
                        <td>{agent.correo}</td>
                        <td>
                          <div className="btn-group">
                            <button className="button btn1" id='ver'>Detelles</button>
                            <button className="button btn2" type="button" id="Modificar">Editar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* El resto de tu JSX aquí */}
                </table>
              </div>
              <div className="row">
                <div className="col">
                  <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" aria-label="Previous" href="#">
                          <span aria-hidden="true">«</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">1</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">2</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">3</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" aria-label="Next" href="#">
                          <span aria-hidden="true">»</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
        </div>
      </div >
    </>
  );
}

export default HomeAdm;