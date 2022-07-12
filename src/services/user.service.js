import authHeader from './auth-header';
import axios from 'axios'
class UserService {
    host = 'http://localhost:8080'
    path = '/api/v1/users'
    getUsers = async () => {
        const users = await axios(`${this.host}${this.path}`, {headers: authHeader()})
        return users;
    }

    deleteUser = async (user) => {
        return await axios(`${this.host}${this.path}/${user.email}`, {method:'DELETE', headers: authHeader()})
    }

    addNewAdmin = async (adminData) => {
        return await axios(`${this.host}${this.path}`, {method:'POST', data: adminData, headers: authHeader()})
    }
 
 }
 export default new UserService();