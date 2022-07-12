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

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const theme = createTheme();

export default function Schedule() {
  const [data, setData] = useState(null);
  const [termsByMember, setTermsByMember] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(false);


  useEffect(() => {
    const token = authService.getCurrentToken();
    coachService.getCoaches().then((response) => {
      setData(response.data);
    });
    trainingService.getByMember(token.sub).then((response) => {
      setTermsByMember(response.data);
    });
    console.log(termsByMember);
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ mt: 10, mb: 2 }} variant="h6" component="div">
                  Your scheduled terms:
                </Typography>
                <Demo>
                  <List >
                    {
                      termsByMember.map((term)=>(
                        <ListItem key={term.id}>
                        <ListItemAvatar>
                          <Avatar>
                            <FolderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={term.date+ " by: " +term.coach.firstName+ " "+term.coach.lastName}
                          secondary={"Start time: "+ term.startTime+ " End time: "+term.endTime}
                        />
                      </ListItem>
                      ))
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
  );
}
