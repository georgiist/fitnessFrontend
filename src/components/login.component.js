import React, { Component } from "react";
import translate from "../i18n/translate";
import FitnessService from "../services/fitness.service";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onClean = this.onClean.bind(this);


    this.state = {
      measure: "",
      currentUser: {
        email: "",
        password: "",
      },
      message: ""
    };
  }
  onChangePassword(e) {
    const password = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          password: password
        }
      };
    });
  }



  onChangeEmail(e) {
    const email = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          email: email
        }
      };
    });
  }

  onLogin() {
    if (this.state.currentUser.email !== "" && this.state.currentUser.password !== "") {
      FitnessService.login(this.state.currentUser)
        .then(response => {
          alert("Logged in successfully!");
        })
        .catch((error) => {
          alert(error.response.data.error)
        });
    } else {
      alert("You have not entered anything!")
    }
  }

  onClean() {
    this.setState(function (prevState) {

      return {
        currentBMI: {
          ...prevState.currentBMI,
          weight: "",
          height: "",
        }
      };
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">{translate("email")}</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">{translate("password")} </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentUser.password}
                  onChange={this.onChangePassword}
                />
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.onLogin}
            >{translate("login")}            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.onClean}
            >
              {translate("resetBtn")}
            </button>

          </div>
        ) : (
          <div>
            <br />
            <p>{translate("somethingWrong")}</p>
          </div>
        )}
      </div>
    );
  }
}
