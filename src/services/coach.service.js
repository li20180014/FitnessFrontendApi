import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/coaches";

class CoachService {

  getCoaches() {
    return axios.get(API_URL);
  }

  addNewCoach = async (coachData) => {
    return await axios(API_URL, {method:'POST', data: coachData, headers: authHeader()})
  }
}
export default new CoachService();