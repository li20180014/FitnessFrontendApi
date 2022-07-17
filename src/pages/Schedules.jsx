import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import coachService from "../services/coach.service";
import trainingService from "../services/training.service";
import authService from "../services/auth.service";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import FolderIcon from '@mui/icons-material/Folder';
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const theme = createTheme();

export default function Schedule() {
  const [data, setData] = useState(null);
  const [termsByMember, setTermsByMember] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [role,setRole]= useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxSpots, setMaxSpots] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!date || !startTime || !endTime || !maxSpots ||
      date == 'undefined' || startTime == 'undefined' || endTime == 'undefined' ||
      maxSpots == 'undefined')
      {
           alert('Please fill in all required fileds!')
           return;
      }
      if(maxSpots==0){
        alert('Max spots cant be 0!')
           return;
      }

      if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)){
        alert('Please enter date in the correct format!')
        return;
      }

      if(!/^\d{1,2}\:\d{2}\:\d{2}$/.test(startTime)){
        alert('Please enter the start time in the correct format!')
        return;
      }

      if(!/^\d{1,2}\:\d{2}\:\d{2}$/.test(endTime)){
        alert('Please enter the end time in the correct format!')
        return;
      }
        

    trainingService.create(date, startTime, endTime, maxSpots).then(
      (response) => {
        setMessage(response.data.message);
        setSnackbarMessage("Successfully added new available term!");
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        if(resMessage){
          setSnackbarMessage(error.response.data);
        }else{
          setSnackbarMessage("Error adding new term!");
        }
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
    console.log(message);
    console.log(successful);
  };

  useEffect(() => {
    const token = authService.getCurrentToken();
    setRole(token.authorities[0].authority);
    coachService.getCoaches().then((response) => {
      setData(response.data);
    });
    trainingService.getByMember(token.sub).then((response) => {
      setTermsByMember(response.data);
    });
    console.log(termsByMember);
  }, []);

  
  const onChangeDate = (e) => {
    const date = e.target.value;
    setDate(date);
  };

  const onChangeStartTime = (e) => {
    const startTime = e.target.value;
    setStartTime(startTime);
  };

  const onChangeEndTime = (e) => {
    const endTime = e.target.value;
    setEndTime(endTime);
  };

  const onChangeMaxSpots =(e)=>{
    const maxSpots = e.target.value;
    setMaxSpots(maxSpots);
  }

  return (
    role!=="ROLE_COACH" ?   <ThemeProvider theme={theme}>
    <CssBaseline />

    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ fontSize: { lg: "44px", xs: "30px" } }}
          mb="40px"
          textAlign="center"
        >
          Schedule a Training Session
        </Typography>
        <Grid container spacing={4}>
          {data !== null &&
            data.map((data) => (
              <Grid item key={data.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={data.imageSrc}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.firstName} {data.lastName}
                    </Typography>
                    <Typography>
                      Email: {data.email} <br />
                      Years of experience: {data.yearsOfExperience}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to="/trainings" state={{ coach: data }}>
                      <Button size="small">View available terms</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>

        {termsByMember !== null && (
          <Grid >
            <Grid item xs={12} md={6}>
              <Typography sx={{ mt: 10, mb: 2 }} variant="h6" component="div">
                Your scheduled trainings:
              </Typography>
              <Demo>
                <List sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }} >
                  {
                    termsByMember.map((term)=>{
                      if(term.attended==null){
                        term.attended="Not defined";
                      }
                      return (
                     
                      <ListItem key={term.training.id}>
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={term.training.date+ " by: " +term.training.coach.firstName+ " "+term.training.coach.lastName}
                        secondary={"Start time: "+ term.training.startTime+ " End time: "+term.training.endTime}

                      />
                       <ListItemText
                        // primary={"Start time: "+ term.training.startTime+ " End time: "+term.training.endTime}
                        secondary={"Has attended: "+term.attended}
                      />
                    </ListItem>
                    
                    )})
                  }
                </List>
              </Demo>
            </Grid>
          </Grid>
        )}
      </Container>
    </main>
    <Snackbar
                      open={snackbarMessage != ''}
                      autoHideDuration={3000}
                      onClose={() => setSnackbarMessage('')}
                      message={snackbarMessage}
                  />
  </ThemeProvider>
                  :
                  <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { lg: "44px", xs: "30px" } }}
            mb="40px"
            textAlign="center"
          >
            Add available trainings
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              id="Date"
              label="Date in format yyyy-mm-dd"
              name="date"
              autoFocus
              onChange={onChangeDate}
              sx={{
                input: {
                  fontWeight: "700",
                  border: "none",
                  borderRadius: "4px",
                },
                width: { lg: "800px", xs: "350px" },
                backgroundColor: "#fff",
                borderRadius: "40px",
              }}
            />
     

            <TextField
              margin="normal"
              required
              id="startTime"
              label="Start Time in format hh:mm:ss"
              name="startTime"
              onChange={onChangeStartTime}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              id="endTime"
              label="End Time in format hh:mm:ss"
              name="endTime"
              onChange={onChangeEndTime}
              autoFocus
            />
             <TextField
              margin="normal"
              required
              id="maxSpots"
              label="Max Spots"
              name="maxSpots"
              onChange={onChangeMaxSpots}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ maxWidth: "11rem" }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
                        open={snackbarMessage != ''}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarMessage('')}
                        message={snackbarMessage}
                    />
    </ThemeProvider>
  );
}
