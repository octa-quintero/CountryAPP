import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage/landingPage";
import Home from "./components/home/home.js";
import Details from "./components/details/details.js";
import CreateActivitys from "./components/activityAndCountry/createActivities.js";
import SearchcActivities from "./components/searchActivities/searchActivities.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/activity" element={<CreateActivitys/>}/>
        <Route path="/activitySearch" element={<SearchcActivities/>}/>
      </Routes>
    </div>
  );
}

export default App;
