import React, { useState, useContext } from "react";
import translate from "../i18n/translate";
import { useNavigate } from "react-router-dom";
import { Authorization } from "./authorization";
import FitnessService from "../services/fitness.service";
import Select from "react-select";

const CreateDietAndProgramRequestComponent = () => {
  const { currentUser } = useContext(Authorization);

  const [request, setRequest] = useState({
    comment: "",
    activityLevel: "",
    goal: "",
    weight: "",
    height: "",
    email: currentUser.email,
    measure: "",
  });
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setRequest((prev) => ({ ...prev, [name]: value }));
  };

  const onChangeActivityLevel = (e) => {
    const { id } = e.currentTarget;
    setRequest((prev) => ({ ...prev, activityLevel: id }));
  };
  const onChangeMeasure = (e) => {
    setRequest((prev) => ({ ...prev, measure: e.value }));
  };

  const onChangeGoal = (e) => {
    const { id } = e.currentTarget;
    setRequest((prev) => ({ ...prev, goal: id }));
  };
  const clean = () => {
    setRequest({
      comment: "",
      activityLevel: "",
      goal: "",
      weight: "",
      height: "",
      email: currentUser.email,
    });
    document.getElementById("comment").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";

    document.getElementById("lightActivity").checked = false;
    document.getElementById("moderateActivity").checked = false;
    document.getElementById("highActivity").checked = false;
    document.getElementById("weightLoss").checked = false;
    document.getElementById("cleaning").checked = false;
    document.getElementById("weightGain").checked = false;
  };

  const onSendRequest = async (e) => {
    e.preventDefault();
    let data = {
      activityLevel: request.activityLevel,
      goal: request.goal,
      email: request.email,
      comment: request.comment,
      weight: request.weight,
      gender: currentUser.gender,
      height: request.height,
      measure: request.measure,
    };
    let isValid = true;

    const hasError =
      data.activityLevel === "" ||
      data.goal === "" ||
      data.email === "" ||
      data.weight === "" ||
      data.height === "";

    const language = document.getElementById("languageSelector").value;

    if (!hasError) {
      if (data.measure === "metres") {
        if (data.height > 2.5) {
          isValid = false;
          let error;
          if (language === "ENG") {
            error = "You have not enterd valid height!";
          } else {
            error = "Не сте въвели вярна височина!";
          }
          alert(error);
        } else {
          data.height = data.height * 100;
        }
      } else {
        if (data.height > 250 || data.height < 50) {
          isValid = false;
          let error;
          if (language === "ENG") {
            error = "You have not enterd valid height!";
          } else {
            error = "Не сте въвели вярна височина!";
          }
          alert(error);
        }
      }
      if (isValid) {
        try {
          FitnessService.createRequest(data).then((response) => {
            navigate("/profile");
            let message;
            if (language === "ENG") {
              message = "The request has been sent successfully!";
            } else {
              message = "Заявката е изпратена успешно!";
            }
            alert(message);
          });
        } catch (error) {
          alert(error.response.data.error);
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
    <div className="edit-form">
      <div className="form">
        <div className="form-group">
          <label htmlFor="yourGoal">{translate("yourGoal")}:</label>
          <br></br>
          <input
            type="radio"
            id="weightLoss"
            name="goal"
            onChange={onChangeGoal}
          />
          <label htmlFor="weightLoss">{translate("weightLoss")} </label>
          <br></br>
          <input
            type="radio"
            id="cleaning"
            name="goal"
            onChange={onChangeGoal}
          />
          <label htmlFor="cleaning">{translate("cleaning")}</label>
          <br></br>
          <input
            type="radio"
            id="weightGain"
            name="goal"
            onChange={onChangeGoal}
          />
          <label htmlFor="weightGain">{translate("weightGain")} </label>
          <br></br>
        </div>

        <div className="form-group">
          <label htmlFor="title">{translate("yourWeight")}:</label>
          <input
            type="text"
            className="form-control"
            id="weight"
            name="weight"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lightActivity">{translate("activityLevel")}:</label>
          <br></br>
          <input
            type="radio"
            id="lightActivity"
            name="activityLevel"
            onChange={onChangeActivityLevel}
          />
          <label htmlFor="lightActivity">{translate("lightActivity")} </label>
          <br></br>
          <input
            type="radio"
            id="moderateActivity"
            name="activityLevel"
            onChange={onChangeActivityLevel}
          />
          <label htmlFor="moderateActivity">
            {translate("moderateActivity")}
          </label>
          <br></br>
          <input
            type="radio"
            id="highActivity"
            name="activityLevel"
            onChange={onChangeActivityLevel}
          />
          <label htmlFor="highActivity">{translate("highActivity")} </label>
          <br></br>
        </div>

        <div className="form-group">
          <label htmlFor="height">{translate("height")}:</label>
          <Select
            className="form-group"
            options={[
              {
                value: "metres",
                label: translate("metres"),
              },
              {
                value: "cantimetres",
                label: translate("cantimetres"),
              },
            ]}
            onChange={onChangeMeasure}
          />
          <input
            type="text"
            className="form-control"
            id="height"
            name="height"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="comment">{translate("comment")}:</label>
          <input
            type="text"
            className="form-control"
            id="comment"
            name="comment"
            onChange={onChange}
          />
        </div>

        <div className="buttons">
          <button onClick={onSendRequest} className="badge badge-danger mr-2">
            {translate("sendBtn")}
          </button>

          <button onClick={clean} className="badge badge-success">
            {translate("resetBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDietAndProgramRequestComponent;
