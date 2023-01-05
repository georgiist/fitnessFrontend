import http from "../http-common";

class FitnessService {
  sendEmail(data) {
    return http.post("/sendEmail", data)
  }
}

export default new FitnessService();