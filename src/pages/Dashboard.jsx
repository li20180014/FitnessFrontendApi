import { useEffect, useState } from "react";
import authService from '../services/auth.service'
import userService from '../services/user.service'
import {useNavigate} from 'react-router-dom';
import Box from "@mui/system/Box";
import LinearProgress from '@mui/material/LinearProgress';

export const Dashboard = () =>{
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    useEffect(() => {
        const token = authService.getCurrentToken()
        if (!token || token.authorities[0]?.authority != 'ROLE_ADMIN') {
            navigate('/')
        }

        userService.getUsers().then(response=>{
            new Promise(resolve => setTimeout(resolve, 1500))
            .then(() => setUsers(response.data));
            
        });

    },[])
    return (
        <Box style={{color:'black'}}>
            {(users && users.length > 0) ? 
            <Box>
                {users.map(user => user.email)}
            </Box>
                
            : <LinearProgress/>  }
        </Box>
    )
}