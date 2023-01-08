import React from "react";
import translate from "../i18n/translate";
function ProgrammesComponent() {

  return (
    <div>
      <div className="items">
        <div className="left">
          <h4>{translate("forBeginners")}</h4>
          <br></br>
          <ul className="noneBullets">
            <li><strong>{translate("monday")} </strong>{translate("monday1")}</li>
            <li><strong>{translate("tuesday")} </strong>{translate("tuesday1")}</li>
            <li><strong>{translate("wednesday")} </strong>{translate("rest")}</li>
            <li><strong>{translate("thursday")} </strong>{translate("thursday1")}</li>
            <li><strong>{translate("friday")} </strong>{translate("friday1")}</li>
            <li><strong>{translate("saturday")} </strong>{translate("rest")}</li>
            <li><strong>{translate("sunday")} </strong>{translate("rest")}</li>
          </ul>
        </div>
        <div className="right">
          <h4>{translate("forAdvanced")}</h4>
          <br></br>
          <ul className="noneBullets">
            <li><strong>{translate("monday")} </strong>{translate("monday2")}</li>
            <li><strong>{translate("tuesday")} </strong>{translate("tuesday2")}</li>
            <li><strong>{translate("wednesday")} </strong>{translate("wednesday2")}</li>
            <li><strong>{translate("thursday")} </strong>{translate("rest")}</li>
            <li><strong>{translate("friday")} </strong>{translate("friday2")}</li>
            <li><strong>{translate("saturday")} </strong>{translate("saturday2")}</li>
            <li><strong>{translate("sunday")} </strong>{translate("rest")}</li>
          </ul>
        </div>
      </div>

      <br></br>
      <br></br>

      <div className="items">
        <div className="left">
          <h4>{translate("balanced")}</h4>
          <ul className="noneBullets">
            <li><strong>{translate("monday")} </strong>{translate("monday3")}</li>
            <li><strong>{translate("tuesday")} </strong>{translate("tuesday3")}</li>
            <li><strong>{translate("wednesday")} </strong>{translate("rest")}</li>
            <li><strong>{translate("thursday")} </strong>{translate("thursday3")}</li>
            <li><strong>{translate("friday")} </strong>{translate("friday3")}</li>
            <li><strong>{translate("saturday")} </strong>{translate("rest")}</li>
            <li><strong>{translate("sunday")} </strong>{translate("rest")}</li>
          </ul>
        </div>
        <div className="right">
          <h4>{translate("muscleGaining")}</h4>
          <br></br>
          <ul className="noneBullets">
            <li><strong>{translate("monday")} </strong>{translate("monday4")}</li>
            <li><strong>{translate("tuesday")} </strong>{translate("tuesday4")}</li>
            <li><strong>{translate("wednesday")} </strong>{translate("wednesday4")}</li>
            <li><strong>{translate("thursday")} </strong>{translate("thursday4")}</li>
            <li><strong>{translate("friday")} </strong>{translate("friday4")}</li>
            <li><strong>{translate("saturday")} </strong>{translate("saturday4")}</li>
            <li><strong>{translate("sunday")} </strong>{translate("rest")}</li>
          </ul>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>

      <h5 className="center">Трениращият винаги може да смени една от тренировките с друга, ако желае да наблегне на определена мускулна група.</h5>
      <br></br>
      <br></br>
      <br></br>


    </div>
  );
}

export default ProgrammesComponent;