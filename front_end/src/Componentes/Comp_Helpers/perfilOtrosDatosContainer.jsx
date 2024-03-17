import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { Reloj } from "../Home";
import axios from 'axios';

function PerfilOtrosD() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    contrasenaAntigua: "",
    contrasenaNueva: "",
    contrasenaNuevaConfirmacion: "",
    telefono: "",
  });
  const [errors, setErrors] = useState({}); // Inicializar errors como un objeto vacío
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user"); // Ruta para obtener datos del usuario desde el servidor
        setUserData(response.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpiar error al cambiar el valor
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setErrors({}); // Limpiar los errores al cerrar el modal
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // Validaciones
    const newErrors = {};
  
    if (!formData.contrasenaAntigua || !formData.contrasenaNueva || !formData.contrasenaNuevaConfirmacion || !formData.telefono) {
      newErrors.general = "Todos los campos son obligatorios.";
      setErrors(newErrors);
      toast.error(newErrors.general);
      return; 
    }
  
    if (formData.contrasenaNueva !== formData.contrasenaNuevaConfirmacion || formData.contrasenaAntigua === formData.contrasenaNueva) {
      newErrors.contrasena = "Las contraseñas no coinciden o son iguales.";
      setErrors(newErrors);
      toast.error(newErrors.contrasena);
      return; 
    }
  
    if (!/^[A-Z]/.test(formData.contrasenaNueva) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.contrasenaNueva)) {
      newErrors.contrasena = "La contraseñas deben comenzar con mayúscula y contener al menos un carácter especial.";
      setErrors(newErrors);
      toast.error(newErrors.contrasena);
      return; 
    }
  
    if (!/^[A-Z]/.test(formData.contrasenaAntigua) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.contrasenaAntigua)) {
      newErrors.contrasenaAntigua = "La contraseña debe comenzar con mayúscula y contener al menos un carácter especial.";
      setErrors(newErrors);
      toast.error(newErrors.contrasenaAntigua);
      return; 
    }
  
    if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = "El número de teléfono debe contener al menos 10 dígitos.";
      setErrors(newErrors);
      toast.error(newErrors.telefono);
      return; 
    }

    if(Object.keys(newErrors).length === 0) {
      try {
          const response = await axios.put(`http://localhost:4000/user/${userData.id}`, {
              telefono: formData.telefono,
              contrasena: formData.contrasenaNueva
          });
  
          if (response.status === 200) {
              console.log(response);
              toast.success("Los datos fueron actualizados exitosamente!");
          } else {
              console.log('Error actualizando el usuario');
              toast.error("Se produjo un error al actualizar los datos del usuario");
          }
      } catch (error) {
          console.error('Error actualizando el usuario', error);
          toast.error("Se produjo un error al actualizar los datos del usuario");
      }
  }

  };  

  return (
    <>
      <Toaster />

      <div className="card shadow mb-3">
        <div className="card-header py-3">
          <p className="text-success m-0 fw-bold">Datos Adicionales</p>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label className="form-label" htmlFor="contrasena">
                <strong>Contraseña</strong>
              </label>
              <input
                className="form-control"
                type="password"
                id="contrasena"
                placeholder="********"
                name="contrasena"
                value={formData.contrasenaNuevaConfirmacion}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="telefono">
                    <strong>Número de teléfono</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="telefono"
                    placeholder="123-456-7890"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                  {errors && errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="salario">
                    <strong>Salario</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="salario"
                    placeholder="0.00"
                    name="salario"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
            <Button className="Button2" onClick={handleModalOpen}>
              Editar Datos Personales
            </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="col-md-12">
        
          <Reloj fullWidth={true} /> {/* Aquí se pasa la propiedad fullWidth como true */}

      </div>

      {/* Modal para la edición de datos personales */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
            <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Detalles del agente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña Antigua:</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                name="contrasenaAntigua"
                value={formData.contrasenaAntigua}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña Nueva:</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                name="contrasenaNueva"
                value={formData.contrasenaNueva}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña:</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                name="contrasenaNuevaConfirmacion"
                value={formData.contrasenaNuevaConfirmacion}
                onChange={handleInputChange}
              />
              {errors && errors.contrasena && <Form.Control.Feedback type="invalid">{errors.contrasena}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número de teléfono:</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
              {errors && errors.telefono && <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
          <Button className="Button2" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PerfilOtrosD;
