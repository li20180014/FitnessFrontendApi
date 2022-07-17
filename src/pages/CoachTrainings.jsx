import React, { useState, useEffect } from "react";
import trainingService from "../services/training.service";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { alertTitleClasses, Button } from "@mui/material";
import Box from "@mui/system/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import authService from "../services/auth.service";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

const theme = createTheme();


const CoachTrainings = () => {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [viewAttendees, setViewAttendeesModal] = useState(false);
  const [setAttendance, setAttendanceModal] = useState(false);
  const [value, setValue] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const handleRadioOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnClick = (id) => {
    trainingService.getAttendeesFromAppointment(id).then((response) => {
      setUsers(response.data);
    });
    
    setViewAttendeesModal(true);
  };

  useEffect(() => {
      const token = authService.getCurrentToken();
      const email = token.sub;
      trainingService.getTrainingsByCoach(email).then((response) => {
        setData(response.data);
      });
    }, []);

  const handleConfirmClick = (id, hasAttended) => {
    console.log(id, hasAttended);
    trainingService.updateAttendee(hasAttended, id).then((response) => {
      alert("Successfully updated member attendance!");
      const member = response.data;
      let newArr = users.map((user)=>{
        if(user.id == member.id && user.member.id == member.member.id ){
            return { ...user, ["attended"]: member.attended};
          } else {
            return user;
          }
        });
      setUsers(newArr);
      setAttendanceModal(false);
    },
    (error)=>{
      alert(error.response.data);
    }
    );
  };

  const handleSetAttendanceClick=(appointment)=>{


    const attended = appointment.attended;
    if(attended==null){
      setValue(false);
    }else{
      setValue(attended);
    }

    setSelectedAppointment(appointment);
    setSelectedUser(appointment.member);
    setAttendanceModal(true);
  }

  return (
    <ThemeProvider theme={theme}>
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
            Your available trainings
          </Typography>
          <Grid container spacing={4}>
            {data !== null &&
              data.map((day) => (
                <Grid item key={day.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {day.date}
                      </Typography>
                      <Typography>
                        Start time: {day.startTime} <br />
                        End time: {day.endTime}
                      </Typography>
                      <Typography mb="20px">
                        Remaining spots: {day.remainingSpots}
                      </Typography>
                      <Button variant="contained" onClick={()=>handleOnClick(day.id)}>
                        View all attendees
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <Modal
            open={viewAttendees}
            onClose={() => setViewAttendeesModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                width: "50%",
                color: "black",
                p: 4,
                borderRadius: "20px",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                All training attendees:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "& > *": { mb: 4 },
                }}
              >
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  {users!==null && users.map((appointment) => {
                    return (
                      <ListItem
                        key={appointment.id}
                        secondaryAction={
                            <Button
                            edge="end"
                              variant="contained"
                              sx={{ mr: 2, fontSize: "0.7em" }}
                              onClick={() => handleSetAttendanceClick(appointment)}
                            >
                              Set Attendance
                            </Button>
                        }
                        disablePadding
                      >
                        <ListItemButton role={undefined} dense>
                          <ListItemAvatar>
                            <Avatar alt="User" />
                          </ListItemAvatar>
                          <ListItemText id={appointment.id} primary={appointment.member.firstName+" "+appointment.member.lastName} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  
                  <Button
                    onClick={() => setViewAttendeesModal(false)}
                    variant="outlined"
                    sx={{ fontSize: "1.2em" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>

          <Modal
            open={setAttendance}
            onClose={() => setAttendanceModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                width: "30%",
                color: "black",
                p: 4,
                borderRadius: "20px",
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Attendee: {selectedUser.firstName+" "+selectedUser.lastName}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "& > *": { mb: 4 },
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    defaultValue={value}
                    value={value}
                    onChange={handleRadioOnChange}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Attended"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Hasn't Attended"
                    />
                  </RadioGroup>
                </FormControl>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  <Button variant="contained" sx={{ mr: 2, fontSize: "1.2em" }} onClick={()=> handleConfirmClick(selectedAppointment.id, value)}>
                    Confirm
                  </Button>
                  <Button
                    onClick={() => setAttendanceModal(false)}
                    variant="outlined"
                    sx={{ fontSize: "1.2em" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Container>
      </main>
      <Snackbar
        open={snackbarMessage != ""}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
};

export default CoachTrainings;
