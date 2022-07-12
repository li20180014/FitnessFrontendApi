import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/trainings";

class CoachService {

  getAvailableByCoach(id) {
    return axios.get(API_URL+"/coach/"+id, {headers: authHeader()});
  }

  scheduleAppointment(id) {
    return axios.post(API_URL+"/appointments/"+id,{},{headers: authHeader()});
  }
  
  getByMember(email){
    return axios.get(API_URL+"/member/"+email, {headers: authHeader()});
  }
}
export default new CoachService();