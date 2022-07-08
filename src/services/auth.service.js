import axios from "axios";
import jwtDecode from "jwt-decode";
const API_URL = "http://localhost:8080/api/v1/users";
const API_URL_LOGIN = "http://localhost:8080/api/v1";

class AuthService {
   login(username, password) {
    return axios
      .post(API_URL_LOGIN + "/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.headers.authorization) {
           console.log(response);
           var token = response.headers.authorization;
            token = token.replace('Bearer ','');
            localStorage.setItem("token", JSON.stringify(token));

          //   var decoded = jwtDecode(token);
          //   console.log(decoded);
          // localStorage.setItem("token", JSON.stringify(decoded));
        }
        
        return response.data;
      });
  };

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
    var token = localStorage.getItem('token');
    var decoded = jwtDecode(token);
    return JSON.parse(decoded);
  }

}
export default new AuthService();