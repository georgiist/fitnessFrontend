import http from "../http-common";

class FitnessService {
  sendEmail(data) {
    return http.post("/sendEmail", data);
  }
  signUp(data) {
    return http.post("/signUp", data);
  }
  login(data) {
    return http.post("/login", data);
  }
  getUserData(data) {
    return http.post("/getUserData", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  getProgramRequests() {
    return http.get("/getProgramRequests");
  }
  getRequestData(id) {
    return http.get(`/getRequestData/${id}`);
  }
  createRequest(data) {
    return http.post(`/createRequest`, data);
  }
  addNewProgram(data) {
    return http.post(`/addNewProgram`, data);
  }
}

export default new FitnessService();
