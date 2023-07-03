import React, { useState, useContext } from "react";
import translate from "../i18n/translate";
import { useNavigate } from "react-router-dom";
import { Authorization } from "./authorization";

const SignUpComponent = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
    firstName: "",
    lastName: "",
    gender: "",
    profileImage: "",
  });
  const navigate = useNavigate();

  const { signUp } = useContext(Authorization);

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeGender = (e) => {
    const { id } = e.currentTarget;
    setNewUser((prev) => ({ ...prev, gender: id }));
  };
  const clean = () => {
    setNewUser({
      email: "",
      password: "",
      repeatedPassword: "",
      firstName: "",
      lastName: "",
      gender: "",
      profileImage: "",
    });
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("repeatedPassword").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;
    document.getElementById("fileReader").value = "";
  };

  const onChangeImage = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e);
    reader.onload = function () {
      setNewUser((prev) => ({ ...prev, profileImage: btoa(reader.result) }));
    };
  };

  const onSignUp = async (e) => {
    e.preventDefault();

    let data = {
      email: newUser.email,
      password: newUser.password,
      repeatedPassword: newUser.repeatedPassword,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      gender: newUser.gender,
      profileImage: newUser.profileImage,
    };
    const language = document.getElementById("languageSelector").value;

    if (
      data.email !== "" &&
      data.password !== "" &&
      data.repeatedPassword !== "" &&
      data.firstName !== "" &&
      data.lastName !== "" &&
      data.gender !== ""
    ) {
      if (
        !data.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        let error;
        if (language === "ENG") {
          error = "Wrong email format!";
        } else {
          error = "Невалиден формат на имейла!";
        }
        alert(error);
      } else {
        if (data.password === data.repeatedPassword) {
          await signUp(data);
          navigate("/login");
        } else {
          let error;
          if (language === "ENG") {
            error = "The passwords are not equal!";
          } else {
            error = "Паролите не са еднакви!";
          }
          alert(error);
        }
      }
    } else {
      let error;
      if (language === "ENG") {
        error = "You have not entered the required data!";
      } else {
        error = "Не сте въвели нужните данни!";
      }
      alert(error);
    }
  };

  return (
    <div className="edit-form" style={{ marginBottom: "200px" }}>
      <form>
        <div>
          <label>{translate("profileImage")}:</label>
          <img
            hidden={newUser.profileImage !== "" ? "" : "hidden"}
            className="profileImage"
            src={`data:image/jpeg;base64,${newUser.profileImage}`}
            alt="Profile"
          />
          <br></br>

          <input
            id="fileReader"
            type="file"
            name="profileImage"
            onChange={(event) => {
              onChangeImage(event.target.files[0]);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">{translate("firstName")} </label>
          <input
            autocomplete="off"
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">{translate("lastName")} </label>
          <input
            autocomplete="off"
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">{translate("email")}</label>
          <input
            autocomplete="off"
            type="text"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">{translate("password")} </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="repeatedPassword">
            {translate("repeatPassword")}{" "}
          </label>
          <input
            type="password"
            className="form-control"
            id="repeatedPassword"
            name="repeatedPassword"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">{translate("gender")}:</label>
          <br></br>
          <input
            type="radio"
            id="male"
            name="gender"
            onChange={onChangeGender}
          />
          <label htmlFor="male">{translate("male")} </label>
          <br></br>
          <input
            type="radio"
            id="female"
            name="gender"
            onChange={onChangeGender}
          />
          <label htmlFor="female">{translate("female")} </label>
          <br></br>
        </div>
      </form>

      <button className="badge badge-danger mr-2" onClick={onSignUp}>
        {translate("signUp")}{" "}
      </button>

      <button type="submit" className="badge badge-success" onClick={clean}>
        {translate("resetBtn")}
      </button>
    </div>
  );
};

export default SignUpComponent;
