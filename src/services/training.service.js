import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/v1/trainings";
const API_URL1 = "http://localhost:8080/api/v1/appointments";

class CoachService {

  getTrainingsByCoach(email){
    return axios.get(API_URL+"/coach/"+email, {headers: authHeader()});
  }

  getAttendeesFromAppointment(id){
    return axios.get(API_URL1+"/training/"+id, {headers: authHeader()});
  }

  updateAttendee(attended,appid){
    return axios.put(API_URL1+"/attendance/"+appid,{attended},{headers: authHeader()});
  }

  getAvailableByCoach(id) {
    return axios.get(API_URL+"/coach/available/"+id, {headers: authHeader()});
  }

  scheduleAppointment(id) {
    return axios.post(API_URL1+"/"+id,{},{headers: authHeader()});
  }
  
  getByMember(email){
    return axios.get(API_URL1+"/member/"+email, {headers: authHeader()});
  }

  create(date, startTime, endTime, maxSpots){
    return axios.post(API_URL,{date, startTime, endTime, maxSpots}, {headers: authHeader()});
  }
}
export default new CoachService();