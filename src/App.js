import React, { useState, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthContext } from "./components/AuthContext";

import HomeComponent from "./components/home.component";
import DietsComponent from "./components/diets.component";
import ProgrammesComponent from "./components/programmes.component";
import CalculatorComponent from "./components/calculator.component";
import SendEmailComponent from "./components/sendEmail.component";

import { I18nProvider, LOCALES } from "./i18n";
import translate from "./i18n/translate";
import LoginComponent from "./components/login.component";
import SignUpComponent from "./components/signUp.component";
import ProfileComponent from "./components/profile.component";
import AddDietAndProgramComponent from "./components/addDietAndProgram.component";
import CreateDietAndProgramRequestComponent from "./components/createDietAndProgramRequest.component";

function App() {
  const [locale, setLocale] = useState(LOCALES.BULGARIAN);
  const { currentUser } = useContext(AuthContext);

  function onChangeLanuage(e) {
    let language = document.getElementById("languageSelector").value;
    if (language === "ENG") {
      setLocale(LOCALES.ENGLISH);
    } else {
      setLocale(LOCALES.BULGARIAN);
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
              {!currentUser?.isAdmin ? (
                <Link to={"/sendEmail"} className="nav-link">
                  {translate("contacts")}
                </Link>
              ) : (
                ""
              )}
            </li>
            {!currentUser ? (
              <Link to={"/login"} className="nav-link">
                {translate("login")}
              </Link>
            ) : (
              ""
            )}
            {!currentUser ? (
              <Link to={"/signUp"} className="nav-link">
                {translate("signUp")}
              </Link>
            ) : (
              ""
            )}
            {currentUser ? (
              <Link to={"/profile"} className="nav-link">
                {translate("profile")}
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            <select id="languageSelector" onChange={onChangeLanuage}>
              <option value="BG">BG</option>
              <option value="ENG">ENG</option>
            </select>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signUp" element={<SignUpComponent />} />
            <Route path="/programmes" element={<ProgrammesComponent />} />
            <Route path="/diets" element={<DietsComponent />} />
            <Route path="/calculator" element={<CalculatorComponent />} />
            <Route path="/sendEmail" element={<SendEmailComponent />} />
            <Route path="/profile" element={<ProfileComponent />} />
            <Route
              path="/newProgram/:id"
              element={<AddDietAndProgramComponent />}
            />
            <Route
              path="/createRequest"
              element={<CreateDietAndProgramRequestComponent />}
            />
          </Routes>
        </div>
        <div className="footer bg-dark">&copy; {translate("footerText")}</div>
      </div>
    </I18nProvider>
  );
}

export default App;
