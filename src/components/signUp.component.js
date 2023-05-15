import React, { Component } from "react";
import translate from "../i18n/translate";
import FitnessService from "../services/fitness.service";

export default class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRepeatedPassword = this.onChangeRepeatedPassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
    this.onClean = this.onClean.bind(this);


    this.state = {
      measure: "",
      currentUser: {
        email: "",
        password: "",
        repeatedPassword: "",
        firstName: "",
        lastName: ""
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

  onChangeRepeatedPassword(e) {
    const repeatedPassword = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          repeatedPassword: repeatedPassword
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

  onChangeFirstName(e) {
    const firstName = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          firstName: firstName
        }
      };
    });
  }
  onChangeLastName(e) {
    const lastName = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          lastName: lastName
        }
      };
    });
  }

  onSignUp() {
    if (this.state.currentUser.email !== "" && this.state.currentUser.password !== "" && this.state.currentUser.repeatedPassword && this.state.currentUser.firstName && this.state.currentUser.lastName) {
      if (
        !this.state.currentUser.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        alert("Wrong email format!")
      } else {
        if (this.state.currentUser.password === this.state.currentUser.repeatedPassword) {
          FitnessService.signUp(this.state.currentUser)
            .then(response => {
              alert("Signed up successfully!");
            });
        } else {
          alert("Passwords are not equal!")
        }

      }
    } else {
      alert("You have not entered everything!")
    }
  }

  onClean() {
    this.setState(function (prevState) {

      return {
        currentUser: {
          ...prevState.currentUser,
          email: "",
          password: "",
          repeatedPassword: "",
          firstName: "",
          lastName: ""
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
                <label htmlFor="description">{translate("firstName")} </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentUser.firstName}
                  onChange={this.onChangeFirstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">{translate("lastName")} </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentUser.lastName}
                  onChange={this.onChangeLastName}
                />
              </div>

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

              <div className="form-group">
                <label htmlFor="description">{translate("repeatPassword")} </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentUser.repeatedPassword}
                  onChange={this.onChangeRepeatedPassword}
                />
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.onSignUp}
            >{translate("signUp")}            </button>

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
