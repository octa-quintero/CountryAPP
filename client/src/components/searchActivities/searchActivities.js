import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../redux/action.js";
import { NavLink } from "react-router-dom";
import Footer from "../footer/footer";
import NavBar from "../navBar/navBar";
import styles from "./searchActivitiesStyle.module.css";

export default function SearchActivities() {
  const dispatch = useDispatch(); // Hook para despachar acciones de Redux
  const [selectedDifficulty, setSelectedDifficulty] = useState("all"); // Estado para almacenar la dificultad seleccionada
  const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual
  const activities = useSelector((state) => state.activities); // Obtener actividades del estado global

  const activitiesPerPage = 10; // Número de actividades por página
  const indexOfLastActivity = currentPage * activitiesPerPage; // Índice del último elemento de la página
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage; // Índice del primer elemento de la página
  const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity); // Actividades de la página actual
  console.log(currentActivities);

  // Función para ir a la página siguiente
  const nextPage = () => {
    if (indexOfLastActivity < activities.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para ir a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Efecto para hacer scroll hacia arriba y obtener todas las actividades al cargar el componente
  useEffect(() => {
    window.scrollTo(0, 0); // Hacer scroll hacia arriba cuando se cambia de página
    dispatch(getActivities("all")); // Obtener todas las actividades al cargar el componente
  }, [dispatch]);

  // Manejar el cambio de opción en el select de dificultad
  const handleSelectDifficult = (e) => {
    e.preventDefault();
    const selectedValue = e.target.value;
    console.log("Selected Difficulty:", selectedValue);
    setSelectedDifficulty(selectedValue); // Actualizar la dificultad seleccionada en el estado
    dispatch(getActivities(selectedValue)); // Obtener actividades según la dificultad seleccionada
  };

  // Manejar el cambio de opción en el select de temporada
  const handleSelectSeason = (e) => {
    e.preventDefault();
    dispatch(getActivities(e.target.value)); // Obtener actividades según la temporada seleccionada
  };

  return (
    <div>
      <NavBar />
      <div className={styles.activitiesContainer}>
        <div className={styles.activitiesCards}>
          <div className={styles.lineDivisor}>
            <h3 className={styles.detalles}>Actividades Turisticas</h3>
          </div>
          {activities.length ? (
            activities.map((activity, index) => (
              <div key={index} className={styles.activitiesCard}>
                {activity.countries && activity.countries.length > 0 ? (
                  activity.countries.map((country) => (
                    <div key={country.id} className={styles.activiTyCard}>
                    <NavLink 
                      key={country.id}
                      to={`/details/${country.id}`}
                      className={styles.activitiesLink}
                    >
      <p className={styles.activitiesCountry}>
        {country.name}
      </p>
<div className={styles.activitiesImage} >
      <img src={country.image} className={styles.activityImage} />
    </div>
                    </NavLink>
                </div>
                  ))
                ) : (
                  <p>No countries added</p>
                )}
  <ul className={styles.activitiesList1}>
    <li className={styles.activitiesListItem}>
      Actividad: <p>{activity.name}</p>
    </li>
    <li className={styles.activitiesListItem}>
      Dificultad: <p>{activity.difficult}</p>
    </li>
    <li className={styles.activitiesListItem}>
      Duracion: <p>{activity.duration}{' '}{'Dias'}</p>
    </li>
    <li className={styles.activitiesListItem}>
      Temporada: <p>{activity.season}</p>
    </li>
  </ul>
              </div>
            ))
          ) : (
            <p className={styles.fail}>Sin actividades registradas!! = (</p>
          )}
          <div className={styles.filtro}>
            <h1 className={styles.filtroTitle}>Filtro</h1>
                    <label>Dificultad</label>
          <select 
          onChange={handleSelectDifficult}
          className={styles.activitiesSelect}
          >
            <option value="all">Todas</option>
            {[1, 2, 3, 4, 5].map((difficult) => (
              <option key={difficult} value={difficult}>
                {difficult}
              </option>
            ))}
          </select>
          <label>Temporada</label>
          <select
            onChange={handleSelectSeason}
            className={styles.activities_select}
          >
            <option value="all">Todas</option>
            {["Verano", "Otoño", "Invierno", "Primavera"].map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
          </div>
  <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={prevPage}
          >
            <span><i class="fa-solid fa-arrow-left"></i>Anterior</span>
          </button>
          <button
              disabled={indexOfLastActivity >= activities.length}
            className={styles.paginationButton}
            onClick={nextPage}
          >
            <span>Siguiente<i class="fa-solid fa-arrow-right"></i></span>
          </button>
        </div>
<div className={styles.lineDivisor}></div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
