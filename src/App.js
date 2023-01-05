import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomeComponent from "./components/home.component";
import DietsComponent from "./components/diets.component";
import ProgrammesComponent from "./components/programmes.component";
import CalculatorComponent from "./components/calculator.component";
import SendEmailComponent from "./components/sendEmail.component";

import { I18nProvider, LOCALES } from "./i18n";
import translate from "./i18n/translate";


function App() {
  const [locale, setLocale] = useState(LOCALES.BULGARIAN)

  function onChangeLanuage(e) {
    let language = document.getElementById("languageSelector").value;
    if (language === "ENG") {
      setLocale(LOCALES.ENGLISH)
    } else {
      setLocale(LOCALES.BULGARIAN)
    }
  }
  return (
    <I18nProvider locale={locale}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            DG Fitness
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                {translate("home")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/programmes"} className="nav-link">
                {translate("programmes")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/diets"} className="nav-link">
                {translate("diets")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/calculator"} className="nav-link">
                {translate("calculator")}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/sendEmail"} className="nav-link">
                {translate("contacts")}
              </Link>
            </li>
          </div>
          <div >
            <select id="languageSelector" onChange={onChangeLanuage}>
              <option value="BG">BG</option>
              <option value="ENG">ENG</option>
            </select>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/"]} component={HomeComponent} />
            <Route exact path="/programmes" component={ProgrammesComponent} />
            <Route exact path="/diets" component={DietsComponent} />
            <Route path="/calculator" component={CalculatorComponent} />
            <Route path="/sendEmail" component={SendEmailComponent} />

          </Switch>
        </div>
        <div className="footer bg-dark">
          &copy; {translate("footerText")}
        </div>
      </div>

    </I18nProvider>);
}

export default App;