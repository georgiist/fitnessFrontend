import React, { useState, useContext } from "react";
import translate from "../i18n/translate";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const LoginComponent = () => {
  const [profile, setProfile] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const [error, setError] = useState(undefined);

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };
  const clean = () => {
    setProfile({
      email: "",
      password: "",
    });
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    setError(undefined);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let data = {
      email: profile.email,
      password: profile.password,
    };

    const hasError = data.email === "" || data.password === "";

    hasError
      ? setError("You have not entered the required data!")
      : setError(undefined);
    if (!hasError) {
      try {
        await login(data);
        navigate("/profile");
        // setError(undefined);
      } catch (error) {
        console.log(error);
        // alert(error.response.data.error);
        // setError(error.response.data.error);
      }
    }
  };

  return (
    <div className="edit-form">
      <h4>{translate("login")}</h4>
      <div className="form">
        <div className="form-group">
          <label htmlFor="title">{translate("emailSenderTitle")}</label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">{translate("password")}</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />

          <div style={{ marginTop: "5%" }}>
            {/* <img
              hidden={error ? "" : "hidden"}
              width="5%"
              src={errorIcon}
              alt="Error"
              style={{
                float: "left",
                display: "inline",
                width: "5%",
                marginRight: "3%",
              }}
            /> */}
            <p>{error}</p>
          </div>
          <div className="buttons">
            <button onClick={onLogin}  className="badge badge-danger mr-2">
              {translate("login")}
            </button>

            <button onClick={clean} className="badge badge-success">
              {translate("resetBtn")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
