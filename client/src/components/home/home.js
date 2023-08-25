import React from "react";
import SearchBar from "../searchBar/searchBar"
import NavBar from "../navBar/navBar"
import Footer from "../footer/footer"
import "../home/homeStyle.css"

function Home() {
return (
  <div className="container">
    <NavBar/>
    <SearchBar/>
    <Footer/>
  </div>
);
}



export default Home;