import http from "../http-common";

class FitnessService {
  sendEmail(data) {
    return http.post("/sendEmail", data)
  }
  signUp(data) {
    return http.post("/signUp", data)
  }
  login(data) {
    return http.post("/login", data)
  }
}

export default new FitnessService();