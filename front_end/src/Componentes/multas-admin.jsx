import React, {  useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/admcss.css"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';


import Footer from './Comp_Helpers/Footer.jsx';
import Navbaradm from './Comp_Helpers/Navbaradm.jsx';
import Topbar from './Comp_Helpers/Topbar.jsx';

function MultasAdim() {
  const [multas, setMultas] = useState([]);
  const [selectedMulta, setSelectedMulta] = useState(null);
  const [editData, setEditData] = useState({
    nombre_multado: '',
    matricula: '',
    placa: '',
    razon: '',
    monto: '',
    fecha: ''
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Función para obtener las multas
  const fetchMultas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/Multa');
      setMultas(response.data);
    } catch (error) {
      console.error('Error fetching multas:', error);
    }
  };

  // Llama a fetchMultas cuando el componente se monta
  useEffect(() => {
    fetchMultas();
  }, []);

  const handleDetailsModalOpen = (multa) => {
    setSelectedMulta(multa);
    setShowDetailsModal(true);
  };

  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
  };

  const handleEditModalOpen = (multa) => {
    setSelectedMulta(multa);
    setEditData({
      nombre_multado: multa.nombre_multado,
      matricula: multa.matricula,
      placa: multa.placa,
      razon: multa.razon,
      monto: multa.monto,
      fecha: multa.fecha
    });
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setErrors({}); // Limpiar los errores al cerrar el modal
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    // Validaciones
    const newErrors = {};

    // Implementa tus validaciones aquí
    if (!editData.nombre_multado || !editData.matricula || !editData.placa || !editData.razon || !editData.monto || !editData.fecha) {
      newErrors.general = "Todos los campos son obligatorios.";
      setErrors(newErrors);
      toast.error(newErrors.general);
      return;
    }

    try {
      // Envía los datos editados al servidor
      await axios.put(`http://localhost:4000/Multa/${selectedMulta.id}`, editData);
      fetchMultas(); // Vuelve a cargar las multas después de la edición
      setShowEditModal(false); // Cierra el modal de edición
      toast.success("Los datos fueron actualizados exitosamente.");
    } catch (error) {
      // Aquí podrías mostrar un mensaje de error al usuario
      toast.error("Error al actualizar los datos.");
    }
  };

  return (
    <>
      <div id="page-top"></div>
      <div id="wrapper">
        <Navbaradm />
        <div className="d-flex flex-column" id="content-wrapper">
          <Topbar titulo="Administración de Multas" />
          <div className="search">
            <input placeholder="Buscar..." required="" type="text" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="filter-container">
            <select id="estadoFilter" className="filter-select">
              <option value="">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            <label htmlFor="estadoFilter" className="filter-label">Filtrar por Estado</label>
          </div>
          <Link to="/nuevamulta"> 
            <button className="button-nuevamulta">Nueva Multa</button> 
          </Link>
          <div className="card-body">
            <div className="table-responsive text-center table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
              <table className="table table-striped table-bordered my-0" id="dataTable">
                <thead>
                  <tr>
                    <th className="text-center titulo">CÉDULA</th>
                    <th className="text-center titulo">NOMBRE</th>
                    <th className="text-center titulo">MATRICULA</th>
                    <th className="text-center titulo">PLACA</th>
                    <th className="text-center titulo">RAZON</th>
                    <th className="text-center titulo">MONTO</th>
                    <th className="text-center titulo">FECHA</th>
                    <th className="text-center titulo">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {multas.map((multa, index) => (
                    <tr key={index}>
                      <td>{multa.cedula_usuario}</td>
                      <td>{multa.nombre_multado}</td>
                      <td>{multa.matricula}</td>
                      <td>{multa.placa}</td>
                      <td>{multa.razon}</td>
                      <td>{multa.monto}</td>
                      <td>{multa.fecha}</td>
                      <td>
                        <div className="btn-group">
                          <button className="button btn1" id='details' onClick={() => handleDetailsModalOpen(multa)}>Detalles</button>
                          <button className="button btn2" type="button" id="Edit" onClick={() => handleEditModalOpen(multa)}>Editar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
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
      </div>
      <Toaster />
      <Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
  <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
    <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Detalles del agente</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedMulta && (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="fw-bold">Cédula:</label>
              <input type="text" className="form-control" value={selectedMulta.cedula_usuario} readOnly />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="fw-bold">Nombre:</label>
              <input type="text" className="form-control" value={selectedMulta.nombre_multado} readOnly />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="fw-bold">Matrícula:</label>
              <input type="text" className="form-control" value={selectedMulta.matricula} readOnly />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="fw-bold">Placa:</label>
              <input type="text" className="form-control" value={selectedMulta.placa} readOnly />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="fw-bold">Razón:</label>
              <input type="text" className="form-control" value={selectedMulta.razon} readOnly />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="fw-bold">Monto:</label>
              <input type="text" className="form-control" value={selectedMulta.monto} readOnly />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label className="fw-bold">Fecha:</label>
              <input type="text" className="form-control" value={selectedMulta.fecha} readOnly />
            </div>
          </div>
        </div>
      </div>
    )}
    </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleDetailsModalClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>

      {/* Modal para editar multa */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
          <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Editar Datos</Modal.Title>
       </Modal.Header>
       <Modal.Body>
       <Form>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formNombreMultado">
              <Form.Label className="fw-bold">Nombre:</Form.Label>
              <Form.Control type="text" placeholder="Nombre" name="nombre_multado" value={editData.nombre_multado} onChange={handleEditInputChange} />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formMatricula">
            <Form.Label className="fw-bold">Matrícula:</Form.Label>
            <Form.Control type="text" placeholder="Matrícula" name="matricula" value={editData.matricula} onChange={handleEditInputChange} />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formPlaca">
            <Form.Label className="fw-bold">Placa:</Form.Label>
            <Form.Control type="text" placeholder="Placa" name="placa" value={editData.placa} onChange={handleEditInputChange} />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formRazon">
            <Form.Label className="fw-bold">Razón:</Form.Label>
            <Form.Control type="text" placeholder="Razón" name="razon" value={editData.razon} onChange={handleEditInputChange} />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formMonto">
            <Form.Label className="fw-bold">Monto:</Form.Label>
            <Form.Control type="text" placeholder="Monto" name="monto" value={editData.monto} onChange={handleEditInputChange} />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formFecha">
            <Form.Label className="fw-bold">Fecha:</Form.Label>
            <Form.Control type="text" placeholder="Fecha" name="fecha" value={editData.fecha} onChange={handleEditInputChange} />
          </Form.Group>
        </div>
      </div>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </Form>
    </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditModalClose}>Cerrar</Button>
        <Button className="Button2" onClick={handleSaveChanges}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default MultasAdim;
