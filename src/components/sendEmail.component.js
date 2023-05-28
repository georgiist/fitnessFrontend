import React, { useContext, useState } from "react";
import FitnessService from "../services/fitness.service";
import { AuthContext } from "./AuthContext";
import translate from "../i18n/translate";
import { trackPromise } from "react-promise-tracker";

const SendEmailComponent = () => {
  const { currentUser } = useContext(AuthContext);

  const [currentEmail, setCurrentEmail] = useState({
    subject: "",
    text: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmail((prev) => ({ ...prev, [name]: value }));
  };
  const clean = () => {
    setCurrentEmail({
      sender: "",
      subject: "",
      text: "",
    });
    document.getElementById("sender").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("text").value = "";
  };

  const sendEmail = async (e) => {
    const language = document.getElementById("languageSelector").value;
    let data = {
      subject: currentEmail.subject,
      text: currentEmail.text,
      sender: currentUser?.email || currentEmail.sender,
    };

    console.log(data);
    if (data.subject !== "" && data.text !== "" && data.sender !== "") {
      if (
        !data.sender.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        let error;
        if (language === "ENG") {
          error = "Wrong format for the email!";
        } else {
          error = "Грешен формат на имейла!";
        }
        alert(error);
      } else {
        trackPromise(
          FitnessService.sendEmail(data).then((response) => {
            this.setState({
              loading: false,
            });
            alert("Email sent successfully");
          })
        );
      }
    } else {
      alert("You have not entered everything!");
    }
  };

  return (
    <div>
      {currentEmail ? (
        <div className="edit-form">
          <p>{translate("sendEmailText")}</p>
          <h4>{translate("sendEmailTitle")}</h4>
          <form>
            <div
              hidden={currentUser?.email ? "hidden" : ""}
              className="form-group"
            >
              <label htmlFor="title">{translate("emailSenderTitle")}</label>
              <input
                type="text"
                className="form-control"
                id="sender"
                name="sender"
                value={currentEmail.sender || ""}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">{translate("subjectTitle")}</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={currentEmail.subject || ""}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">{translate("emailTxtTitle")}</label>
              <input
                type="text"
                className="form-control"
                name="text"
                id="text"
                value={currentEmail.text || ""}
                onChange={onChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={sendEmail}>
            {translate("sendBtn")}
          </button>

          <button type="submit" className="badge badge-success" onClick={clean}>
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
};
export default SendEmailComponent;
