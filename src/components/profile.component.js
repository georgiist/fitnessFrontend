import React, { useState, useEffect, useContext } from "react";
import translate from "../i18n/translate";
import { Authorization } from "./authorization";
import { useNavigate } from "react-router-dom";
import FitnessService from "../services/fitness.service";
import profileIcon from "../../src/profileIcon.jpeg";
const ProfileComponent = () => {
  const { currentUser, logout } = useContext(Authorization);

  const [user, setUser] = useState({});
  const [programRequests, setProgramRequests] = useState([]);

  const [profileImageSrc, setProfileImageSrc] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
    getProgramRequests();
  }, []);

  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString("en-GB");
    }
  };

  const getUserData = () => {
    FitnessService.getUserData({
      currentUserEmail: currentUser?.email,
    }).then((response) => {
      setUser(response.data);
      setProfileImageSrc(
        response.data.profileImage
          ? `data:image/jpeg;base64,${response.data.profileImage}`
          : profileIcon
      );
    });
  };

  const getProgramRequests = () => {
    FitnessService.getProgramRequests().then((response) => {
      setProgramRequests(response.data || []);
    });
  };

  const onAddNewDiet = (id) => {
    navigate(`/newProgram/${id}`);
  };

  const onCreateRequest = () => {
    navigate(`/createRequest`);
  };

  const onLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <div>
        <img className="profileImage" src={profileImageSrc} alt="Profile" />
        <h2 className="profileCenter">
          {user.firstName} {user.lastName}
        </h2>
        <h4 className="profileCenter">
          <button className="badge badge-danger mr-2" onClick={onLogout}>
            {translate("logout")}{" "}
          </button>
        </h4>

        <br></br>
      </div>
      <h4 className="profileCenter">
        <button
          hidden={user.hasSentRequest || user.isAdmin ? "hidden" : ""}
          className=""
          onClick={onCreateRequest}
        >
          {translate("createRequest")}
        </button>
      </h4>

      <h3
        className="profileCenter"
        hidden={!user.hasSentRequest ? "hidden" : ""}
      >
        {translate("requestInProgress")}
      </h3>
      <br></br>

      <div
        hidden={user?.isAdmin !== true ? "hidden" : ""}
        style={{ paddingBottom: "100px" }}
      >
        <h3 className="profileCenter">
          {programRequests.length > 0
            ? translate("programRequests")
            : translate("dontHaveAnyProgramRequests")}
        </h3>
        <figure
          hidden={programRequests.length > 0 && user.isAdmin ? "" : "hidden"}
          className="wp-block-table"
        >
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
                <th className="has-text-align-center" data-align="center"></th>
              </tr>
            </thead>
            <tbody>
              {programRequests?.map((request) => {
                return (
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
                      {translate(`${request.goal}`)}
                    </td>
                    <td className="has-text-align-center" data-align="center">
                      {translate(`${request.gender}`)}
                    </td>
                    <td className="has-text-align-center" data-align="center">
                      {formatDate(request.date)}
                    </td>

                    <td
                      style={{ width: "30%" }}
                      className="has-text-align-center"
                      data-align="center"
                    >
                      <button
                        className="badge badge-success"
                        onClick={() => onAddNewDiet(request._id)}
                      >
                        {translate("create")}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </figure>
      </div>

      <div
        hidden={user.diets && user?.isAdmin !== true ? "" : "hidden"}
        className="items"
      >
        <div style={{ paddingBottom: "100px" }}>
          <br></br>
          <h3>{translate("dietGymDay")}</h3>
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
                    {user?.diets?.dietGymDayBreakfast}
                  </td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">
                    {translate("snacking")}
                  </td>
                  <td className="has-text-align-center" data-align="center">
                    {user?.diets?.dietGymDayFirstSnack}
                  </td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">
                    {translate("lunch")}
                  </td>
                  <td className="has-text-align-center" data-align="center">
                    {user?.diets?.dietGymDayLunch}
                  </td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">
                    {translate("snacking")}
                  </td>
                  <td className="has-text-align-center" data-align="center">
                    {user?.diets?.dietGymDaySecondSnack}
                  </td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">
                    {translate("dinner")}
                  </td>
                  <td className="has-text-align-center" data-align="center">
                    {user?.diets?.dietGymDayDinner}
                  </td>
                </tr>
              </tbody>
            </table>
          </figure>
        </div>
        <div className="right" style={{ paddingBottom: "100px" }}>
          <br></br>
          <h3>{translate("dietRestDay")}</h3>
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
                    {user?.diets?.dietRestDayBreakfast}
                  </td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">
                    {translate("snacking")}
                  </td>
                  <td className="has-text-align-center" data-align="center">
                    {user?.diets?.dietRestDayFirstSnack}
                  </td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">
                    {translate("lunch")}
                  </td>
                  <td className="has-text-align-center" data-align="center">
                    {user?.diets?.dietRestDayLunch}
                  </td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">
                    {translate("snacking")}
                  </td>
                  <td className="has-text-align-center" data-align="center">
                    {user?.diets?.dietRestDaySecondSnack}
                  </td>
                </tr>
                <tr>
                  <td className="has-text-align-center" data-align="center">
                    {translate("dinner")}
                  </td>
                  <td className="has-text-align-center" data-align="center">
                    {user?.diets?.dietRestDayDinner}
                  </td>
                </tr>
              </tbody>
            </table>
          </figure>
        </div>
      </div>

      <div
        hidden={user.program && user?.isAdmin !== true ? "" : "hidden"}
        style={{ paddingBottom: "100px" }}
      >
        <br></br>

        <h3>{translate("personalProgram")}</h3>
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
                  {currentUser?.program?.monday}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("tuesday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {currentUser?.program?.tuesday}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("wednesday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {currentUser?.program?.wednesday}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("thursday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {currentUser?.program?.thursday}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("friday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {currentUser?.program?.friday}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("saturday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {currentUser?.program?.saturday}
                </td>
              </tr>
              <tr>
                <td className="has-text-align-center" data-align="center">
                  {translate("sunday")}
                </td>
                <td className="has-text-align-center" data-align="center">
                  {currentUser?.program?.sunday}
                </td>
              </tr>
            </tbody>
          </table>
        </figure>
      </div>
    </div>
  );
};

export default ProfileComponent;
