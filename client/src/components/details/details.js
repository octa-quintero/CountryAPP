import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCountryId, removeCountry } from "../../../src/redux/action";
import { useParams } from "react-router-dom";
import Footer from "../footer/footer"
import styles from "./detailsStyle.module.css";
import NavBar from "../navBar/navBar";
import axios from 'axios';

function Details(props) {
  const { countryDetail, removeCountry, getCountryId } = props;
  const { id } = useParams();

  // Efecto que se ejecuta al montar el componente o cuando cambia el ID
  useEffect(() => {
    if (id) {
      console.log("ID obtenido:", id);
      window.scrollTo(0, 0);
      getCountryId(id);
    }
  }, [removeCountry, getCountryId, id]);

  return (
    <div>
      <NavBar />
      <div className={styles.card}>
        <div className={styles.card1}>
          <div className={styles.lineDivisor}>
            <h3 className={styles.detalles}>Detalles</h3>
          </div>
          <div
            className={styles.cardBackground}
            style={{
              background: `url(${countryDetail.image})`,
              backgroundSize: 'cover',
            }}
          />
          <div className={styles.cardDetail1}>
            <ul className={styles.cardDetail}>
              <li><span className={styles.countryName}>Pais:</span> {countryDetail.name}</li>
              <li><span className={styles.countryCapital}>Capital:</span> {countryDetail.capital}</li>
              <li><span className={styles.countryContinent}>Continente:</span> {countryDetail.continent}</li>
              <li><span className={styles.countrySubregion}>Sub Región:</span> {countryDetail.subregion}</li>
              <li><span className={styles.countrySuperficie}>Superficie:</span> {countryDetail.area}{' km²'}</li>
              <li><span className={styles.countryPoblacion}>Población:</span> {countryDetail.population}{' mill'}</li>
              <li className={styles.activityTuristContainer}>
                <h3 className={styles.detalles1}>Actividades turisticas</h3>
                <ul className={styles.countryActivities}>
                  {countryDetail.TouristActivities && countryDetail.TouristActivities.length > 0 ? (
                    countryDetail.TouristActivities.map(x => (
                      <li key={x.id} className={styles.algo}>
                        <ul>
                          <li><span className={styles.countryName}>Nombre:{' '}</span>{x.name.toUpperCase()}</li>
                          <li><span className={styles.countryName}>Duracion:{' '}</span>{x.duration} Days</li>
                          <li><span className={styles.countryName}>Dificultad:{' '}</span>{x.difficult}</li>
                          <li><span className={styles.countryName}>Temporada:{' '}</span>{x.season}</li>
                        </ul>
                      </li>
                    ))
                  ) : (
                    <h4 className={styles.noActivities}>Este país no tiene actividades</h4>
                  )}
                </ul>
              </li>
            </ul>
          </div>
          <div className={styles.lineDivisor1}></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Mapeo de datos y conectar tu componente React con el store de Redux.
const mapStateToProps = (state) => ({
  countryDetail: state.countryDetail
});

const mapDispatchToProps = (dispatch) => ({
  getCountryId: (id) => dispatch(getCountryId(id)),
  removeCountry: () => dispatch(removeCountry())
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
