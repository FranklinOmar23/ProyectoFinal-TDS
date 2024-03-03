import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';

function PerfilOtrosD() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    contrasenaAntigua: "",
    contrasenaNueva: "",
    contrasenaNuevaConfirmacion: "",
    telefono: "",
  });
  const [errors, setErrors] = useState({}); // Inicializar errors como un objeto vacío

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

    try {
      const response = await fetch('http://localhost:4000/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del usuario');
      }

      toast.success("Los datos fueron actualizados exitosamente!");
      setTimeout(() => {
      handleModalClose();
    }, 2000);
    console.log(formData)
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error al actualizar los datos del usuario');
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
            <Button variant="light" style={{ color: "white", backgroundColor: "#1cc88a" }} onClick={handleModalOpen}>
              Editar Datos Personales
            </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="card shadow mb-5">
        <div className="card-header py-3">
          <p className="text-success m-0 fw-bold">Horario</p>
        </div>
        <div className="card-body">
          <div className="row"></div>
        </div>
      </div>

      {/* Modal para la edición de datos personales */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Datos Personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña Antigua</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                name="contrasenaAntigua"
                value={formData.contrasenaAntigua}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña Nueva</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                name="contrasenaNueva"
                value={formData.contrasenaNueva}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña</Form.Label>
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
              <Form.Label>Número de teléfono</Form.Label>
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
          <Button variant="success" style={{ color: "white", backgroundColor: "#1cc88a" }} onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PerfilOtrosD;
