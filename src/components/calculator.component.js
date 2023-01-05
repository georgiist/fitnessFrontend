import React, { Component } from "react";
import translate from "../i18n/translate";
import Select from 'react-select';

export default class CalculatorComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
    this.onResetBMI = this.onResetBMI.bind(this);


    this.state = {
      measure: "",
      currentBMI: {
        height: "",
        weight: "",
      },
      message: ""
    };
  }
  onChangeHeight(e) {
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

  onChangeMeasure(e) {
    this.setState({ measure: e.value })
  }

  onChangeWeight(e) {
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

  onCalculate() {
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
      } else {
        if (this.state.currentBMI.height > 300 || this.state.currentBMI.height < 50) {
          isValid = false;
          alert("Не сте въвели вярна височина")
        } else {
          height = this.state.currentBMI.height / 100;
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

  onResetBMI() {
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
            <h4>{translate("calculateTitle")}</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">{translate("weightTitle")}</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBMI.weight}
                  onChange={this.onChangeWeight}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">{translate("heightTitle")} </label>

                <Select className="form-group"
                  options={[{
                    "value": "metres",
                    "label": translate("metres")
                  },
                  {
                    "value": "cantimetres",
                    "label": translate("cantimetres")
                  }]}
                  onChange={this.onChangeMeasure.bind(this)}
                />
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentBMI.height}
                  onChange={this.onChangeHeight}
                />
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.onCalculate}
            >{translate("calculateBtn")}            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.onResetBMI}
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
