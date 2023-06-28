import React, { useState, useEffect } from "react";
import translate from "../i18n/translate";
import { useNavigate, useLocation } from "react-router-dom";
import FitnessService from "../services/fitness.service";

const AddDietAndProgramComponent = () => {
  const [request, setRequest] = useState({});

  const [newProgram, setNewProgram] = useState({
    email: request.email,
    dietGymDayDinner: "",
    dietGymDayFirstSnack: "",
    dietGymDayLunch: "",
    dietGymDayBreakfast: "",
    dietGymDaySecondSnack: "",
    dietRestDayBreakfast: "",
    dietRestDayDinner: "",
    dietRestDayFirstSnack: "",
    dietRestDayLunch: "",
    dietRestDaySecondSnack: "",
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setNewProgram((prev) => ({ ...prev, [name]: value }));
  };
  const requestId = useLocation().pathname.split("/")[2];

  useEffect(() => {
    getRequestData();
  }, []);

  const getRequestData = () => {
    FitnessService.getRequestData(requestId).then((response) => {
      setRequest(response.data);
    });
  };

  const clean = () => {
    setNewProgram({
      email: request.email,
      dietGymDayDinner: "",
      dietGymDayFirstSnack: "",
      dietGymDayLunch: "",
      dietGymDayBreakfast: "",
      dietGymDaySecondSnack: "",
      dietRestDayBreakfast: "",
      dietRestDayDinner: "",
      dietRestDayFirstSnack: "",
      dietRestDayLunch: "",
      dietRestDaySecondSnack: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
    });
    document.getElementById("dietGymDayDinner").value = "";
    document.getElementById("dietGymDayFirstSnack").value = "";
    document.getElementById("dietGymDayLunch").value = "";
    document.getElementById("dietGymDayBreakfast").value = "";
    document.getElementById("dietGymDaySecondSnack").value = "";
    document.getElementById("dietRestDayBreakfast").value = "";
    document.getElementById("dietRestDayDinner").value = "";
    document.getElementById("dietRestDayFirstSnack").value = "";
    document.getElementById("dietRestDayLunch").value = "";
    document.getElementById("dietRestDaySecondSnack").value = "";
    document.getElementById("monday").value = "";
    document.getElementById("tuesday").value = "";
    document.getElementById("wednesday").value = "";
    document.getElementById("thursday").value = "";
    document.getElementById("friday").value = "";
    document.getElementById("saturday").value = "";
    document.getElementById("sunday").value = "";
  };

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString("en-GB");
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    let data = {
      email: request.email,
      dietGymDayDinner: newProgram.dietGymDayDinner,
      dietGymDayFirstSnack: newProgram.dietGymDayFirstSnack,
      dietGymDayLunch: newProgram.dietGymDayLunch,
      dietGymDayBreakfast: newProgram.dietGymDayBreakfast,
      dietGymDaySecondSnack: newProgram.dietGymDaySecondSnack,
      dietRestDayBreakfast: newProgram.dietRestDayBreakfast,
      dietRestDayDinner: newProgram.dietRestDayDinner,
      dietRestDayFirstSnack: newProgram.dietRestDayFirstSnack,
      dietRestDayLunch: newProgram.dietRestDayLunch,
      dietRestDaySecondSnack: newProgram.dietRestDaySecondSnack,
      monday: newProgram.monday,
      tuesday: newProgram.tuesday,
      wednesday: newProgram.wednesday,
      thursday: newProgram.thursday,
      friday: newProgram.friday,
      saturday: newProgram.saturday,
      sunday: newProgram.sunday,
    };

    const hasError =
      data.dietGymDayDinner === "" ||
      data.dietGymDayFirstSnack === "" ||
      data.dietGymDayLunch === "" ||
      data.dietGymDayBreakfast === "" ||
      data.dietGymDaySecondSnack === "" ||
      data.dietRestDayBreakfast === "" ||
      data.dietRestDayDinner === "" ||
      data.dietRestDayFirstSnack === "" ||
      data.dietRestDayLunch === "" ||
      data.dietRestDaySecondSnack === "" ||
      data.monday === "" ||
      data.tuesday === "" ||
      data.wednesday === "" ||
      data.thursday === "" ||
      data.friday === "" ||
      data.saturday === "" ||
      data.sunday === "";

    const language = document.getElementById("languageSelector").value;

    if (!hasError) {
      try {
        FitnessService.addNewProgram(data).then((response) => {
          navigate("/profile");
          let message;
          if (language === "ENG") {
            message = "Program added successfully!";
          } else {
            message = "Програмата е добавена успешно!";
          }
          alert(message);
        });
      } catch (error) {
        alert(error.response.data.error);
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
    <div>
      <h3>{translate("personalProgramCreation")}</h3>
      <br></br>
      <div className="form-group">
        <figure className="wp-block-table">
          <table className="has-fixed-layout">
            <thead>
              <tr>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("names")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("email")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("weight")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("height")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("goalHeader")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("gender")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("requestDate")}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={request._id}>
                <td className="has-text-align-center" data-align="center">
                  {request.names}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {request.email}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {request.weight}
                </td>

                <td className="has-text-align-center" data-align="center">
                  {request.height}
                </td>

                <td className="has-text-align-center" data-align="center">
                  {request.goal ? translate(`${request.goal}`) : ""}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {request.gender ? translate(`${request.gender}`) : ""}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {formatDate(request.date)}
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </div>
      <div style={{ paddingBottom: "100px" }}>
        <br></br>
        <h3>{translate("dietGymDay")}:</h3>
        <br></br>
        <figure className="wp-block-table">
          <table className="has-fixed-layout">
            <thead>
              <tr>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("menu")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("food")}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("breakfast")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietGymDayBreakfast"
                    name="dietGymDayBreakfast"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("snacking")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietGymDayFirstSnack"
                    name="dietGymDayFirstSnack"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("lunch")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietGymDayLunch"
                    name="dietGymDayLunch"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("snacking")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietGymDaySecondSnack"
                    name="dietGymDaySecondSnack"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("dinner")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietGymDayDinner"
                    name="dietGymDayDinner"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </div>
      <div className="right" style={{ paddingBottom: "100px" }}>
        <br></br>
        <h3>{translate("dietRestDay")}:</h3>
        <br></br>
        <figure className="wp-block-table">
          <table className="has-fixed-layout">
            <thead>
              <tr>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("menu")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("food")}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("breakfast")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietRestDayBreakfast"
                    name="dietRestDayBreakfast"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("snacking")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietRestDayFirstSnack"
                    name="dietRestDayFirstSnack"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("lunch")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietRestDayLunch"
                    name="dietRestDayLunch"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("snacking")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietRestDaySecondSnack"
                    name="dietRestDaySecondSnack"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("dinner")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="dietRestDayDinner"
                    name="dietRestDayDinner"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </div>
      <div style={{ paddingBottom: "100px" }}>
        <br></br>
        <h3>{translate("trainingProgram")}:</h3>
        <br></br>
        <figure className="wp-block-table">
          <table className="has-fixed-layout">
            <thead>
              <tr>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("day")}</p>
                </th>
                <th className="has-text-align-center" data-align="center">
                  <p>{translate("muscleGroup")}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("monday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="monday"
                    name="monday"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("tuesday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="tuesday"
                    name="tuesday"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("wednesday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="wednesday"
                    name="wednesday"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("thursday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="thursday"
                    name="thursday"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("friday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="friday"
                    name="friday"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>

              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("saturday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="saturday"
                    name="saturday"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>

              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("sunday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  <input
                    type="text"
                    className="form-control"
                    id="sunday"
                    name="sunday"
                    onChange={onChange}
                  />{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </div>

      <div style={{ marginBottom: "50px" }} className="buttons">
        <button onClick={onSave} className="badge badge-success mr-2">
          {translate("create")}
        </button>

        <button onClick={clean} className="badge badge-danger mr-2">
          {translate("resetBtn")}
        </button>
      </div>
    </div>
  );
};

export default AddDietAndProgramComponent;
