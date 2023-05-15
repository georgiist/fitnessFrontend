import React, { Component } from "react";
import translate from "../i18n/translate";

export default class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onClean = this.onClean.bind(this);


    this.state = {
      measure: "",
      currentBMI: {
        height: "",
        weight: "",
      },
      message: ""
    };
  }
  onChangePassword(e) {
    const height = e.target.value;
    this.setState(function (prevState) {
      return {
        currentBMI: {
          ...prevState.currentBMI,
          height: height
        }
      };
    });
  }



  onChangeEmail(e) {
    const weight = e.target.value;
    this.setState(function (prevState) {
      return {
        currentBMI: {
          ...prevState.currentBMI,
          weight: weight
        }
      };
    });
  }

  onLogin() {
    let measure = this.state.measure;
    if (this.state.currentBMI.weight !== "" && this.state.currentBMI.height !== "") {
      let height;
      let isValid = true;
      if (measure === "metres") {
        if (this.state.currentBMI.height > 3) {
          isValid = false;
          alert("Не сте въвели вярна височина")
        } else {
          height = this.state.currentBMI.height;
        }
      } 
      let bmi = this.state.currentBMI.weight / (height * height);
      if (isValid) {
        alert(`Your BMI is: ${bmi.toFixed(2)}`)
      }
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
    const { currentBMI } = this.state;

    return (
      <div>
        {currentBMI ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">{translate("email")}</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBMI.weight}
                  onChange={this.onChangeWeight}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">{translate("password")} </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentBMI.height}
                  onChange={this.onChangePassword}
                />
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.onCalculate}
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
