import React, { useState, useEffect } from "react";
import trainingService from "../services/training.service";
import { useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from '@mui/material/Snackbar';


const theme = createTheme();

const Trainings = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const { coach } = location.state;
  const [value, setValue] = useState();
  const [snackbarMessage, setSnackbarMessage] = useState(false);

  const handleOnClick = (value) => {
    setValue(value);
    console.log(value);

    trainingService.scheduleAppointment(value.id).then((response) => {
      setSnackbarMessage("Successfully reserved training!");
      window.location.reload();
    },
    (error)=>{
      const resMessage = error.response.data;
      setSnackbarMessage(resMessage);
    }
    );
  };

 
  useEffect(() => {
    trainingService.getAvailableByCoach(coach.id).then((response) => {
      setData(response.data);
    });
    console.log(data);
  }, []);

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
            Available Trainings by {coach.firstName} {coach.lastName}
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
                      <Button variant="contained" onClick={() => handleOnClick(day)}>Reserve</Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      <Snackbar
                        open={snackbarMessage != ''}
                        autoHideDuration={3000}
                        onClose={() => setSnackbarMessage('')}
                        message={snackbarMessage}
                    />
    </ThemeProvider>
  );
};

export default Trainings;
