import { useEffect, useState } from "react";
import authService from '../services/auth.service'
import userService from '../services/user.service'
import {useNavigate} from 'react-router-dom';
import Box from "@mui/system/Box";
import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import WarningIcon from '@mui/icons-material/Warning';

export const Dashboard = () =>{
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [usersPanel, setUsersPanel] = useState(false);
    const [deleteUserModalFlag, setDeleteUserModalFlag] = useState(false);
    const [userForDelete, setUserForDelete] = useState(undefined);

    const [deleteUserResponseMessage, setDeleteUserResponseMessage] = useState(false);

    const fetchUsers = () =>{
        userService.getUsers().then(response=>{
            new Promise(resolve => setTimeout(resolve, 1500))
            .then(() => {
                setUsers(response.data)
                setFilteredUsers(response.data.filter(user => user.email != 'nbulat99@gmail.com'))
            });
            
        });
    }
    useEffect(() => {
        const token = authService.getCurrentToken()
        if (!token || token.authorities[0]?.authority != 'ROLE_ADMIN') {
            navigate('/')
        }

        
        fetchUsers();
    },[])

    const openDeleteUserModal = (user) =>{
        setUserForDelete(user)
        setDeleteUserModalFlag(true)
    }

    const deleteUser = (user) => {
        userService.deleteUser(user)
            .then(response => {
                console.log(response);
                setUsers([])
                fetchUsers();
                setDeleteUserResponseMessage('User successfully deleted')
            })
            .catch(err => {
                console.log(err);
                setUsers([])
                fetchUsers();
                setDeleteUserResponseMessage('Error deleting user!')
            });
        setDeleteUserModalFlag(false)
        setFilteredUsers(filteredUsers.map(u => u.email != user.email))
    }
    return (
        <Box style={{color:'black'}}>
            {(users && users.length > 0) ? 
                <Box sx={{p:3}}>

                    <Accordion expanded={usersPanel} onChange={() => setUsersPanel(!usersPanel)} elevation={6}>
                        <AccordionSummary
                            sx={{
                                backgroundColor: usersPanel ? 'primary.light' : 'initial',
                                color: usersPanel ? 'white' : 'initial'
                            }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Users
                            </Typography>
                            <Typography sx={{ color: usersPanel ? 'white' : 'initial' }}>Manage users</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                {filteredUsers && filteredUsers.length > 0 && filteredUsers.map(user => {
                                    return (
                                        <Box key={user.id} sx={{ p: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                                                <Typography>
                                                    <Typography sx={{ fontWeight: 'bold' }}>{`${user.firstName} ${user.lastName}`}</Typography>
                                                    {user.email}
                                                </Typography>
                                                <IconButton aria-label="delete" color="primary" onClick={() => openDeleteUserModal(user)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                            <Divider />
                                        </Box>
                                    )
                                })}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Modal
                        open={deleteUserModalFlag}
                        onClose={() => setDeleteUserModalFlag(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}
                    >
                        <Box sx={{backgroundColor: 'white', width:'50%', color:'black', p:4, borderRadius:'20px'}}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {userForDelete && `Delete user ${userForDelete.firstName} ${userForDelete.lastName}?`}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <WarningIcon />
                                This operation cannot be undone!
                            </Typography>
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" onClick={() => deleteUser(userForDelete)} sx={{ mr: 2 }}>Yes</Button>
                                <Button onClick={() => setDeleteUserModalFlag(false)} variant="outlined">Cancel</Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Snackbar
                        open={deleteUserResponseMessage != ''}
                        autoHideDuration={3000}
                        onClose={() => setDeleteUserResponseMessage('')}
                        message={deleteUserResponseMessage}
                    />
                </Box>

                : <LinearProgress />}
        </Box>
    )
}