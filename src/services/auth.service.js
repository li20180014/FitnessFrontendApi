import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/users";
const API_URL_LOGIN = "http://localhost:8080/api/v1";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL_LOGIN + "/login", {
        username,
        password
      })
      .then(response => {
        // if (response.data.accessToken) {
        //   console.log(response.data);
        //   localStorage.setItem("token", JSON.stringify(response.data));
        // }
        console.log(response);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(firstName,lastName, email, password) {
    return axios.post(API_URL + "/register", {
      firstName,
      lastName,
      email,
      password
    });
  }

  getCurrentToken() {
    return JSON.parse(localStorage.getItem('token'));;
  }

}
export default new AuthService();