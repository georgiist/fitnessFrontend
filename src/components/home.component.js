import React, { Component } from "react";
import translate from "../i18n/translate";

export default class HomeComponent extends Component {

  render() {

    return (
      <div className="list row">

        <div >
          <h4>{translate("wantToHelp")}</h4>

          <br></br>
          <h5>{translate("suitable")}</h5>

          <ul className="list-group">
            <li>{translate("q1")}</li>
            <li>{translate("q2")}</li>
            <li>{translate("q3")}</li>
            <li>{translate("q4")}</li>
            <li>{translate("q5")}</li>
            <li>{translate("q6")}</li>
          </ul>

          <br></br>
          <p>{translate("goal")}</p>

          <p>{translate("experience")}</p>

          <p>{translate("notLying")}</p>
          <p>{translate("firstPlace")}</p>
          <h6>{translate("thankYou")}</h6>
        </div>

      </div>
    );
  }
}
