import { useEffect, useState } from "react";
import authService from '../services/auth.service'
import userService from '../services/user.service'
import coachService from '../services/coach.service'
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
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Tooltip from '@mui/material/Tooltip';
import WarningIcon from '@mui/icons-material/Warning';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Dashboard = () =>{
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    const [usersPanel, setUsersPanel] = useState(false);
    const [coachesPanel, setCoachesPanel] = useState(false);
    const [adminsPanel, setAdminsPanel] = useState(false);

    const [deleteUserModalFlag, setDeleteUserModalFlag] = useState(false);
    const [createNewCoachModalFlag, setCreateNewCoachModalFlag] = useState(false);
    const [createNewAdminModalFlag, setCreateNewAdminModalFlag] = useState(false);
    const [userForDelete, setUserForDelete] = useState(undefined);

    const [snackbarMessage, setSnackbarMessage] = useState(false);

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const [addNewCoachData, setAddNewCoachData] = useState({});
    const [addNewAdminData, setAddNewAdminData] = useState({});

    const fetchUsers = () =>{
        userService.getUsers().then(response=>{
            new Promise(resolve => setTimeout(resolve, 500))
            .then(() => {
                setUsers(response.data)
                setFilteredUsers(response.data)
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

    const createNewCoach = () =>{
        setCreateNewCoachModalFlag(true);
    }

    const createNewAdmin = () =>{
        setCreateNewAdminModalFlag(true);
    }

    const submitNewCoach = () =>{
        if(!addNewCoachData ||
           !addNewCoachData.firstName ||
           !addNewCoachData.lastName ||
           !addNewCoachData.email ||
           !addNewCoachData.password ||
           addNewCoachData.yearsOfExperience == 'undefined' ||
           !addNewCoachData.biography ||
           !addNewCoachData.imageSrc){
                alert('Please fill in all required fileds!')
                return;
           }
        if(addNewCoachData.yearsOfExperience < 0) {
            alert('Years of experience cannot be negative!')
            return;
        }
        
        coachService.addNewCoach(addNewCoachData)
        .then(response => {
            setSnackbarMessage('New coach successfully added!')
            fetchUsers()
        })
        .catch(error => {
            console.log(error);
            setSnackbarMessage('Error adding new coach!')
        })
    }

    const submitNewAdmin = () =>{
        console.log(addNewAdminData)
        if(!addNewAdminData ||
           !addNewAdminData.firstName ||
           !addNewAdminData.lastName ||
           !addNewAdminData.email ||
           !addNewAdminData.password){
                alert('Please fill in all required fileds!')
                return;
           }
        
        userService.addNewAdmin(addNewAdminData)
        .then(response => {
            setSnackbarMessage('New admin successfully added!')
            fetchUsers()
        })
        .catch(error => {
            console.log(error);
            setSnackbarMessage('Error adding new admin!')
        })
    } 

    const deleteUser = (user) => {
        userService.deleteUser(user)
            .then(response => {
                console.log(response);
                setUsers([])
                fetchUsers();
                setSnackbarMessage('User successfully deleted')
            })
            .catch(err => {
                console.log(err);
                setUsers([])
                fetchUsers();
                setSnackbarMessage('Error deleting user!')
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
                            <Typography sx={{ width: '33%', flexShrink: 0, fontSize:'1.4em', fontWeight:'bold' }}>
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
                    <Accordion expanded={coachesPanel} onChange={() => setCoachesPanel(!coachesPanel)} elevation={6}>
                        <AccordionSummary
                            sx={{
                                backgroundColor: coachesPanel ? 'primary.light' : 'initial',
                                color: coachesPanel ? 'white' : 'initial'
                            }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0, fontSize:'1.4em', fontWeight:'bold' }}>
                                Coaches
                            </Typography>
                            <Typography sx={{ color: coachesPanel ? 'white' : 'initial' }}>Manage coaches</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{display:'flex', flexDirection:'column'}}>
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
                            <Tooltip title="Create new coach">
                                <Button sx={{ alignSelf: 'flex-end', p:2, mt:3 }} variant="contained" color="primary" onClick={createNewCoach} endIcon={<PersonAddIcon sx={{fontSize: '1.8em'}} />}>
                                    Add New Coach
                                </Button>
                            </Tooltip>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={adminsPanel} onChange={() => setAdminsPanel(!adminsPanel)} elevation={6}>
                        <AccordionSummary
                            sx={{
                                backgroundColor: adminsPanel ? 'primary.light' : 'initial',
                                color: adminsPanel ? 'white' : 'initial'
                            }}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0, fontSize:'1.4em', fontWeight:'bold'}}>
                                Admins
                            </Typography>
                            <Typography sx={{ color: adminsPanel ? 'white' : 'initial' }}>Manage Admins</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{display:'flex', flexDirection:'column'}}>
                            <Box>
                                {filteredUsers && filteredUsers.length > 0 && filteredUsers.map(user => {
                                    return (
                                        <Box key={user.id} sx={{ p: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center' }}>
                                                <Typography>
                                                    <Typography sx={{ fontWeight: 'bold' }}>{`${user.firstName} ${user.lastName}`}</Typography>
                                                    {user.email}
                                                </Typography>
                                                {user.email != 'nbulat99@gmail.com' &&
                                                    <IconButton aria-label="delete" color="primary" onClick={() => openDeleteUserModal(user)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
                                            </Box>
                                            <Divider />
                                        </Box>
                                    )
                                })}
                            </Box>
                            <Tooltip title="Create new admin">
                                <Button sx={{ alignSelf: 'flex-end', p:2, mt:3  }} variant="contained" color="primary" onClick={createNewAdmin} endIcon={<PersonAddIcon sx={{fontSize: '1.8em'}} />}>
                                    Add New Admin
                                </Button>
                            </Tooltip>
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
                                <Button variant="contained" onClick={() => deleteUser(userForDelete)} sx={{ mr: 2, fontSize:"1.2em"}}>Submit</Button>
                                <Button onClick={() => setDeleteUserModalFlag(false)} variant="outlined" sx={{fontSize:"1.2em"}}>Cancel</Button>
                            </Box>
                        </Box>
                    </Modal>
                    <Modal
                        open={createNewCoachModalFlag}
                        onClose={() => setCreateNewCoachModalFlag(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}
                    >
                        <Box sx={{backgroundColor: 'white', width:'50%', color:'black', p:4, borderRadius:'20px'}}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create new Coach
                            </Typography>
                            <Box sx={{display:'flex', flexDirection:'column', '& > *': {mb:4}}}>
                                <Box sx={{display:'flex', width:'100%'}}>
                                    <TextField sx={{ mr: 2, flex:1 }} id="standard-basic" label="Firstname" variant="standard" required value={addNewCoachData.firstName} onChange={(e)=>setAddNewCoachData({...addNewCoachData, firstName: e.target.value})}/>
                                    <TextField sx={{flex:1}} id="standard-basic" label="Lastname" variant="standard" required value={addNewCoachData.lastName} onChange={(e)=>setAddNewCoachData({...addNewCoachData, lastName: e.target.value})}/>
                                </Box>
                                <TextField id="standard-basic" label="Email" variant="standard" required value={addNewCoachData.email} onChange={(e)=>setAddNewCoachData({...addNewCoachData, email: e.target.value})}/>
                                <FormControl required sx={{}} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={passwordVisibility ? 'text' : 'password'}
                                        value={addNewCoachData.password} onChange={(e)=>setAddNewCoachData({...addNewCoachData, password: e.target.value})}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                                // onMouseDown={handleMouseDownPassword}
                                                >
                                                    {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <TextField
                                    id="outlined-number"
                                    label="Years of experience"
                                    type="number"
                                    variant="standard"
                                    required
                                    value={addNewCoachData.yearsOfExperience} onChange={(e)=>setAddNewCoachData({...addNewCoachData, yearsOfExperience: e.target.value})}
                                />
                                <TextField
                                    sx={{mt:2}}
                                    placeholder="Biography"
                                    multiline
                                    rows={2}
                                    required
                                    value={addNewCoachData.biography} onChange={(e)=>setAddNewCoachData({...addNewCoachData, biography: e.target.value})}
                                />
                                <TextField required id="standard-basic" label="Image link" variant="standard" value={addNewCoachData.imageSrc} onChange={(e)=>setAddNewCoachData({...addNewCoachData, imageSrc: e.target.value})}/>
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={submitNewCoach} sx={{ mr: 2, fontSize:"1.2em" }}>Submit</Button>
                                    <Button onClick={() => setCreateNewCoachModalFlag(false)} variant="outlined" sx={{fontSize:"1.2em"}}>Cancel</Button>
                                </Box>
                            </Box>
                            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <WarningIcon />
                                This operation cannot be undone!
                            </Typography>
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" onClick={() => deleteUser(userForDelete)} sx={{ mr: 2 }}>Yes</Button>
                                <Button onClick={() => setDeleteUserModalFlag(false)} variant="outlined">Cancel</Button>
                            </Box> */}
                        </Box>
                    </Modal>
                    <Modal
                        open={createNewAdminModalFlag}
                        onClose={() => setCreateNewAdminModalFlag(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{display: 'flex', justifyContent:'center', alignItems:'center'}}
                    >
                        <Box sx={{backgroundColor: 'white', width:'50%', color:'black', p:4, borderRadius:'20px'}}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create new Admin
                            </Typography>
                            <Box sx={{display:'flex', flexDirection:'column', '& > *': {mb:4}}}>
                                <Box sx={{display:'flex', width:'100%'}}>
                                    <TextField sx={{ mr: 2, flex:1 }} id="standard-basic" label="Firstname" variant="standard" required value={addNewAdminData.firstName} onChange={(e)=>setAddNewAdminData({...addNewAdminData, firstName: e.target.value})}/>
                                    <TextField sx={{flex:1}} id="standard-basic" label="Lastname" variant="standard" required value={addNewAdminData.lastName} onChange={(e)=>setAddNewAdminData({...addNewAdminData, lastName: e.target.value})}/>
                                </Box>
                                <TextField id="standard-basic" label="Email" variant="standard" required value={addNewAdminData.email} onChange={(e)=>setAddNewAdminData({...addNewAdminData, email: e.target.value})}/>
                                <FormControl required sx={{}} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={passwordVisibility ? 'text' : 'password'}
                                        value={addNewAdminData.password} onChange={(e)=>setAddNewAdminData({...addNewAdminData, password: e.target.value})}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                                                // onMouseDown={handleMouseDownPassword}
                                                >
                                                    {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={submitNewAdmin} sx={{ mr: 2, fontSize:"1.2em" }}>Submit</Button>
                                    <Button onClick={() => setCreateNewAdminModalFlag(false)} variant="outlined" sx={{fontSize:"1.2em"}}>Cancel</Button>
                                </Box>
                            </Box>
                            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <WarningIcon />
                                This operation cannot be undone!
                            </Typography>
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" onClick={() => deleteUser(userForDelete)} sx={{ mr: 2 }}>Yes</Button>
                                <Button onClick={() => setDeleteUserModalFlag(false)} variant="outlined">Cancel</Button>
                            </Box> */}
                        </Box>
                    </Modal>
                    <Snackbar
                        open={snackbarMessage != ''}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarMessage('')}
                        message={snackbarMessage}
                    />
                </Box>

                : <LinearProgress />}
        </Box>
    )
}