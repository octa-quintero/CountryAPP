import React from "react";
import { NavLink } from "react-router-dom";
import "./landingPageStyle.css";

function LandingPage() {
  return (
    <div className="body-container">
      <div className="main">
        <div className="container-country">
          <h1 className="gradient-text">Country APP</h1>
          <h2 className="title2">Bienvenido a la app de búsqueda de países!</h2>
          <h4 className="text">
            Podrás explorar y obtener información detallada
            sobre diferentes países de todo el mundo. Ya sea que estés
            interesado en conocer datos demográficos, actividades turísticas,
            y mucho más, ¡estamos aquí para ayudarte!
          </h4>
          <div className="nav-link-container">
            <NavLink to="/home">
              <button className="button-GO">
                <span className="span-GO">GO!</span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
