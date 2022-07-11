import authHeader from './auth-header';
import axios from 'axios'
class UserService {
    host = 'http://localhost:8080'
    path = '/api/v1/users'
    getUsers = async () => {
        const users = await axios(`${this.host}${this.path}`, {headers: authHeader()})
        return users;
    }
 
 }
 export default new UserService();