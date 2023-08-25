import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivity, getAllCountries } from "../../redux/action";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import NavBar from "../navBar/navBar.js";
import style from "./createActivityStyle.module.css";

function CreateActivitys() {
  // Estado local para manejar los valores del formulario
  const [values, setValues] = useState({
    name: "",
    difficult: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState("incomplete");  // Estado local para manejar mensajes de error en el formulario
  const countries = useSelector((state) => state.countries);  // Obtener la lista de países desde el estado global
  const dispatch = useDispatch();   // Dispatch para ejecutar acciones de Redux

  // Navegación con react-router-dom
  const history = useNavigate();

  // Cargar la lista de países al montar el componente
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  // Función para validar y actualizar la selección de temporada
  const validateSeason = (value) => {
    setError(value !== "" ? "incomplete" : "");
    setValues((prevValues) => ({
      ...prevValues,
      season: value,
    }));
  };

  // Función para validar y actualizar la selección de dificultad
  const validateDifficult = (value) => {
    setError(value === "" ? "incomplete" : "");
    setValues((prevValues) => ({
      ...prevValues,
      difficult: value,
    }));
  };

  // Función para validar y actualizar el nombre
  const validateName = (value) => {
    setError(value === "" ? "incomplete" : "");
    setValues((prevValues) => ({
      ...prevValues,
      name: value,
    }));
  };

  // Función para validar y actualizar la duración
  const validateDuration = (value) => {
    setError(/^\d+$/.test(value) ? "" : "duration");
    setValues((prevValues) => ({
      ...prevValues,
      duration: value,
    }));
  };

  // Función para manejar la selección de países
  const handleSelect = (e) => {
    const { value } = e.target;
    setValues((prevValues) => {
      const updatedCountries = prevValues.countries.includes(value)
        ? prevValues.countries.filter((ct) => ct !== value)
        : [...prevValues.countries, value];
  
      return {
        ...prevValues,
        countries: updatedCountries,
      };
    });
  };

  // Función para limpiar la selección de países
  const onClick2 = () => {
    setValues((prevValues) => ({
      ...prevValues,
      countries: [],
    }));
  };

  // Función para manejar el envío del formulario
  const onSubmit = async (e) => {
    e.preventDefault();
  
    // Validar si todos los campos están completos antes de enviar la solicitud
    if (
      values.name === "" ||
      values.difficult === "" ||
      values.duration === "" ||
      values.season === "" ||
      values.countries.length === 0
    ) {
      alert("Por favor, complete todos los campos.");
      return;
    }
  
    const selectedCountryId = values.countries[0];
  
    try {
      const activityData = {
        id: selectedCountryId,
        name: values.name,
        difficult: values.difficult,
        duration: values.duration,
        season: values.season,
        countries: values.countries,
      };
  
      await dispatch(createActivity(activityData));
  
      setValues({
        name: "",
        difficult: "",
        duration: "",
        season: "",
        countries: [],
      });
  
      alert("Actividad creada exitosamente.");
    } catch (error) {
      console.log("Error creando la actividad:", error);
    }
  };
  
  const order = countries.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <NavBar />
      <div className={style.formContainer}>
        <div className={style.lineDivisor}>
          <h3 className={style.detalles}>Crear Actividad Turistica</h3>
        </div>
        <form onSubmit={onSubmit} className={style.form}>
          <label htmlFor="name" className={style.form_label}>
            Nombre de la actividad:
          </label>
          <input
            name="name"
            value={values.name}
            onChange={(e) => validateName(e.target.value)}
            className={style.form_name}
          />
          <label htmlFor="duration" className={style.form_label}>
            Duracion:
          </label>
          <div className={style.form_duration_container}>
            <input
              name="duration"
              value={values.duration}
              onChange={(e) => validateDuration(e.target.value)}
              className={
                error === "duration"
                  ? style.form_duration_error
                  : style.form_duration
              }
            />
            {error === "duration" ? (
              <span className={style.form_span}>
                Duracion en dias de la actividad
              </span>
            ) : null}
          </div>
          <label className={style.form_label}>Dificultad</label>
          <select
            name="difficult"
            onChange={(e) => validateDifficult(e.target.value)}
            className={style.form_difficult}
          >
            <option value="" disabled selected>
              Seleccionar pais
            </option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value} className={style.form_option}>
                {value}
              </option>
            ))}
          </select>
          <label className={style.form_label}>Temporada</label>
          <select
            name="season"
            onChange={(e) => validateSeason(e.target.value)}
            className={style.form_season}
          >
            <option value="" disabled selected>
              Seleccionar temporada
            </option>
            <option value="Verano" className={style.form_option}>
              Verano
            </option>
            <option value="Otoño" className={style.form_option}>
              Otoño
            </option>
            <option value="Invierno" className={style.form_option}>
              Invierno
            </option>
            <option value="Primavera" className={style.form_option}>
              Primavera
            </option>
          </select>
          <label className={style.form_label_countries}>Paises</label>
          <select
            onChange={handleSelect}
            name="countries"
            className={style.form_countries}
          >
            <option value="" disabled selected>
              Seleccionar país
            </option>
            {order.map((e, i) => (
              <option
                key={e.id}
                value={e.id}
                className={style.form_option_countries}
              >
                {e.name}
              </option>
            ))}
          </select>
          {values.countries.map((e) => {
            let label = countries.find((x) => e === x.id);
            return (
              <p key={e} className={style.form_country}>
                • {label.name}
              </p>
            );
          })}
          <div className={style.pagination}>
            <button
              className={style.paginationButton1}
              type="button"
              onClick={onClick2}
            >
              <span>
                <i class="fa-solid fa-rotate-right"></i>
              </span>
            </button>
            <button className={style.paginationButton} type="submit">
              <span>Crear</span>
            </button>
          </div>
        </form>
        <div className={style.lineDivisor}></div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateActivitys;
