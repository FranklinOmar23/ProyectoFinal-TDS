import React, { useState, useRef } from "react";
import "../../Css/FotoMulta.css";

function FotoMulta() {
  const [profileImage, setProfileImage] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);

  const handleProfileImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setProfileImage(URL.createObjectURL(selectedImage));
  };

  const handleVehicleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setVehicleImage(URL.createObjectURL(selectedImage));
  };

  const profileInputRef = useRef(null);
  const vehicleInputRef = useRef(null);

  const handleProfileImageUploadClick = () => {
    profileInputRef.current.click();
  };

  const handleVehicleImageUploadClick = () => {
    vehicleInputRef.current.click();
  };

  return (
    <div className="row">
      <div className="col-lg-6 mb-3">
        <div className="card">
          <div className="card-body text-center shadow">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <label htmlFor="profileImage" className="form-label mb-2">
                <strong>Foto de Perfil</strong>
              </label>
              <div className="input-div" onClick={handleProfileImageUploadClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  fill="none"
                  stroke="green"
                  className="icon"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line y2="21" x2="12" y1="12" x1="12"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </div>
              <input
                ref={profileInputRef}
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleProfileImageChange}
                style={{ display: "none" }}
              />
            </div>
            <img
              style={{ width: "170px", height: "170px" }}
              className="img-fluid mb-3 mt-4"
              src={
                profileImage ||
                "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              }
              alt="User"
            />
          </div>
        </div>
      </div>
      <div className="col-lg-6 mb-4">
        <div className="card">
          <div className="card-body text-center shadow">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <label htmlFor="vehicleImage" className="form-label mb-2">
                <strong>Foto del Vehículo</strong>
              </label>
              <div className="input-div" onClick={handleVehicleImageUploadClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  fill="none"
                  stroke="green"
                  className="icon"
                >
                  <polyline points="16 16 12 12 8 16"></polyline>
                  <line y2="21" x2="12" y1="12" x1="12"></line>
                  <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                  <polyline points="16 16 12 12 8 16"></polyline>
                </svg>
              </div>
              <input
                ref={vehicleInputRef}
                type="file"
                id="vehicleImage"
                accept="image/*"
                onChange={handleVehicleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <img
              style={{ width: "170px", height: "170px" }}
              className="img-fluid mb-3 mt-4"
              src={vehicleImage || "https://via.placeholder.com/300"}
              alt="Vehicle"
            />
          </div>
        </div>
      </div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="text-success fw-bold m-0">Total de multas</h6>
        </div>
        <div className="card-body">
          <h4 className="small fw-bold">Server migration<span className="float-end">20%</span></h4>
          <div className="progress progress-sm mb-3">
            <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: '20%' }}><span className="visually-hidden">20%</span></div>
          </div>
          <h4 className="small fw-bold">Sales tracking<span className="float-end">40%</span></h4>
          <div className="progress progress-sm mb-3">
            <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: '40%' }}><span className="visually-hidden">40%</span></div>
          </div>
          <h4 className="small fw-bold">Customer Database<span className="float-end">60%</span></h4>
          <div className="progress progress-sm mb-3">
            <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}><span className="visually-hidden">60%</span></div>
          </div>
          <h4 className="small fw-bold">Payout Details<span className="float-end">80%</span></h4>
          <div className="progress progress-sm mb-3">
            <div className="progress-bar bg-info" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '80%' }}><span className="visually-hidden">80%</span></div>
          </div>
          <h4 className="small fw-bold">Account setup<span className="float-end">Complete!</span></h4>
          <div className="progress progress-sm mb-3">
            <div className="progress-bar bg-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}><span className="visually-hidden">100%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FotoMulta;
