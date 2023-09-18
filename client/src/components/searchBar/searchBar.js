import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, searchCountries, removeCountries, getAllCountries, setOrder, getCountriesOrder } from '../../redux/action.js';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../searchBar/searchBarStyle.module.css";
import axios from 'axios';

function SearchBar() {
  // Estado para manejar la entrada de texto de búsqueda y la paginación
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = useState("");

  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);

  useEffect(() => {
    // Cargar países cuando se monta el componente y cuando cambia currentPage
    dispatch(removeCountries());
    dispatch(getAllCountries(currentPage));
  }, [dispatch, currentPage]);

  // Manejar el cambio en el input de búsqueda
  const handleInput = e => {
    setSearchValue(e.target.value);
  };

  // Realizar búsqueda de países
  const search = () => {
    setInput(searchValue);
    dispatch(removeCountries());
    dispatch(getAllCountries());
    setCurrentPage(1); // Reiniciar la página a 1 después de realizar la búsqueda
  };

  // Filtrado de países basado en el input de búsqueda
  const filteredCountries = Array.isArray(countries)
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(input.toLowerCase())
      )
    : [];

  // Calcular índices para mostrar los países de la página actual
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  const currentCountries = Array.isArray(filteredCountries)
    ? filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    : [];

  const totalPages = Array.isArray(filteredCountries)
    ? Math.ceil(filteredCountries.length / countriesPerPage)
    : 0;

  // Funciones para avanzar y retroceder en la paginación
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };
  
  // Estado para guardar el filtro seleccionado
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  // Función para manejar el cambio de filtro
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    if (e.target.value === "all") {
      dispatch(getCountries(1));
    } else {
      setOrder(e.target.value);
      setCurrentPage(1);
      dispatch(getCountriesOrder(e.target.value, 1));
      dispatch(removeCountries());
    }
  };
  
// Definición de las opciones de filtro disponibles
const FilterOptions = [
  { label: "Todos", value: "all",  group: "" },
  { label: "A-Z", value: "asc", group: "Alfabético" },
  { label: "Z-A", value: "desc", group: "Alfabético" },
  { label: "Mas Grande", value: "larger", group: "Poblacion" },
  { label: "Mas Pequeño", value: "smaller", group: "Poblacion" },
  { label: "Mas Grande", value: "grand", group: "Area" },
  { label: "Mas Pequeño", value: "petit", group: "Area" },
  { label: "Europa", value: "Europe", group: "Continente" },
  { label: "America", value: "Americas", group: "Continente" },
  { label: "Asia", value: "Asia", group: "Continente" },
  { label: "Africa", value: "Africa", group: "Continente" },
  { label: "Oceania", value: "Oceania", group: "Continente" },
];

// Agrupar las opciones de filtro por grupos
const groupedOptions = FilterOptions.reduce((acc, option) => {
  if (!acc[option.group]) {
    acc[option.group] = []; // Crear un nuevo grupo si no existe
  }
  acc[option.group].push(option); // Agregar la opción al grupo correspondiente
  return acc;
}, {});



  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <NavLink to="/home" className={styles.navlink}></NavLink>
        </div>
        <div className={styles.FilterOptionsContainer}>
          <h1 className={styles.FilterTitle}>Filtro</h1>
          {Object.entries(groupedOptions).map(([group, options]) => (
            <div key={group} className={styles.FilterOptionsGroup}>
              <p className={styles.FilterOptionsTitle}>{group}</p>
              {options.map((option, index) => (
                <label key={index}>
                  <input
                    className={styles.input}
                    type="radio"
                    name="filterOption"
                    value={option.value}
                    checked={selectedFilter === option.value}
                    onChange={handleFilterChange}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.search}>
          <input
            type="text"
            value={searchValue}
            onChange={handleInput}
            className={styles.searchInput}
          />
          <button
            className={styles.searchButton}
            onClick={search}
          >
            <span className={styles.searchIcon}></span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
          <div className={styles.countryItem}>
            {currentCountries.map((country) => (
              <div key={country.id} className={styles.countryCard}>
                <NavLink to={`/details/${country.id}`} className={styles.link}>
                  <div className={styles.countryFlag}>
                <img
                  src={country.image}
                  className={styles.countryFlag1}
                />
                </div>
                </NavLink>
                  <div className={styles.countryInfo}> 
                    <ul className={styles.listInfo}>
                      <li><span className={styles.countryName}>Pais:</span> {country.name}</li>
                      <li><span className={styles.countryCapital}>Capital:</span> {country.capital}</li>
                      <li><span className={styles.countryContinent}>Continente:</span> {country.continent}</li>
                      <li><span className={styles.countrySubRegion}>Sub Región:</span> {country.subregion}</li>
                      <li><span className={styles.countryArea}>Superficie:</span> {country.area}{' km²'}</li>
                      <li><span className={styles.countryPoblacion}>Población:</span> {country.population}{' mill'}</li>
                    </ul>
                  </div>
              </div>
              ))}
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={goToPreviousPage}
          >
            <span><i class="fa-solid fa-arrow-left"></i>Anterior</span>
          </button>
          <button
            className={styles.paginationButton}
            onClick={goToNextPage}
          >
            <span>Siguiente<i class="fa-solid fa-arrow-right"></i></span>
          </button>
        </div>
          </div>
        <div className={styles.lineDivisor}></div>
      </div>
    </div>
  );
}

export default SearchBar;
