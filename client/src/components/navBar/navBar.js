import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navBarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faArrowUpFromBracket, faHouse, faEarthAmericas, faBicycle, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú desplegable está abierto o cerrado

  // Función para alternar el estado isOpen cuando se hace clic en el botón de menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar-header">
      <div className="navbar">
        {/* Enlace al inicio */}
        <NavLink to="/home" className="logo">
          <div className="logo">  
            <span className="logo-main">Country</span>
            <span className="logo-sub">APP</span>
          </div>
        </NavLink>
        {/* Enlaces principales de navegación */}
        <ul className="links">
          <NavLink to="/home" className="btn5">
            <div>
              <FontAwesomeIcon icon={faHouse} style={{ marginRight: "0.3rem" }}/>Inicio
            </div>
          </NavLink>
          <NavLink to="/activitySearch" className="btn5">
            <div>
              <FontAwesomeIcon icon={faEarthAmericas} style={{ marginRight: "0.3rem" }} />
              Paises y Actividades
            </div>
          </NavLink>
          <NavLink to="/activity" className="btn5">
            <div>
              <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ marginRight: "0.3rem" }} />
              Crear 
            </div>
          </NavLink>
          <NavLink to="/" className="btn5">
            <div>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "0.3rem" }} />
              Sobre Nosotros
            </div>
          </NavLink>
        </ul>
        {/* Botón para acción GO */}
        <NavLink to="#">
          <button className="button-GO">
            <span className="span-GO">GO!</span>
          </button>
        </NavLink>
        {/* Botón para alternar el menú desplegable */}
        <div className="toggle-btn" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="dropdown-menu open">
          <ul>
            <li><NavLink exact to="/">Inicio</NavLink></li>
            <li><NavLink to="/paises">Paises</NavLink></li>
            <li><NavLink to="/actividades">Actividades</NavLink></li>
            <li><NavLink to="/nosotros">Sobre Nosotros</NavLink></li>
            <li><NavLink to="#" className="action-btn">GO!</NavLink></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
