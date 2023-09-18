import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from"../footer/footerStyle.module.css"


function Footer(){
  return(
    <div>
      <div className={styles.footer}>
        <NavLink to="/home" className={styles.logo} style={{ textDecoration: 'none' }}>
          <div className={styles.logoIcon}>  
            <span className={styles.logoMain}>Country</span>
            <span className={styles.logoSub}>APP</span>
          </div>
        </NavLink>
          <div className={styles.social}>
            <a href="" className={styles.socialItemIg}><i class="fa-brands fa-instagram"></i></a>
            <a href="" className={styles.socialItemFb}><i class="fa-brands fa-facebook"></i></a>
            <a href="" className={styles.socialItemWs}><i class="fa-brands fa-whatsapp"></i></a>
          </div>
            <ul className={styles.footerMenu}>
              <li className={styles.menuItem}>Legal</li>
              <li className={styles.menuItem}>Cookies</li>
              <li className={styles.menuItem}>Privacidad</li>
            </ul>
          <span className={styles.copyright}>2023. OctavioQuintero</span>
      </div>
    </div>
  )
}

export default Footer;