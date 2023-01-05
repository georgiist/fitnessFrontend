import React, { Component } from "react";
import translate from "../i18n/translate";

export default class DietsComponent extends Component {

  render() {
    return (
      <div className="submit-form">
        <p>{translate("dietsText")}</p>

      </div>
    );
  }
}
