import React, { Component } from "react";
import FitnessService from "../services/fitness.service";

import translate from "../i18n/translate";
import { trackPromise } from "react-promise-tracker";

export default class SendEmailComponent extends Component {


  constructor(props) {
    super(props);

    this.onChangeEmailText = this.onChangeEmailText.bind(this);
    this.onChangeSender = this.onChangeSender.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.resetEmail = this.resetEmail.bind(this);
    this.state = {
      currentEmail: {
        sender: "",
        subject: "",
        text: "",
      },
      message: "",
      loading: true
    };
  }

  onChangeSender(e) {
    const sender = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmail: {
          ...prevState.currentEmail,
          sender: sender
        }
      };
    });
  }
  onChangeEmailText(e) {
    const text = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmail: {
          ...prevState.currentEmail,
          text: text
        }
      };
    });
  }

  onChangeSubject(e) {
    const subject = e.target.value;

    this.setState(function (prevState) {
      return {
        currentEmail: {
          ...prevState.currentEmail,
          subject: subject
        }
      };
    });
  }

  sendEmail() {
    const language = document.getElementById("languageSelector").value;
    const currentEmail = this.state.currentEmail;
    let data = {
      subject: currentEmail.subject,
      text: currentEmail.text,
      sender: currentEmail.sender
    };

    if (data.subject !== "" && data.text !== "" && data.sender !== "") {
      if (!data.sender.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        let error;
        if (language === "ENG") {
          error = "Wrong format for the email!"
        } else {
          error = "Грешен формат на имейла!"
        }
        alert(error);
      } else {
        trackPromise(
          FitnessService.sendEmail(data)
            .then(response => {
              this.setState({
                loading: false,
              });
              alert("Email sent successfully");
            }));
      }

    }

  }
  resetEmail() {
    this.setState(function (prevState) {

      return {
        currentEmail: {
          ...prevState.currentEmail,
          subject: "",
          sender: "",
          text: ""
        }
      };
    });
  }
  render() {
    const { currentEmail } = this.state;

    return (
      // <I18nProvider locale={LOCALES.ENGLISH}>

      <div>
        {currentEmail ? (
          <div className="edit-form">
            <p>{translate("sendEmailText")}</p>
            <h4>{translate("sendEmailTitle")}</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">
                  {translate("emailSenderTitle")}

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentEmail.sender}
                  onChange={this.onChangeSender}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  {translate("subjectTitle")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentEmail.subject}
                  onChange={this.onChangeSubject}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  {translate("emailTxtTitle")}

                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emailText"
                  value={currentEmail.text}
                  onChange={this.onChangeEmailText}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.sendEmail}
            >
              {translate("sendBtn")}
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.resetEmail}
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
      //  </I18nProvider>
    );
  }
}


