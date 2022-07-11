import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import coachService from '../services/coach.service';

const cards = [1, 2, 3, 4, 5, 6];

const theme = createTheme();

export default function Schedule() {

    const[data, setData]= useState(null);

    useEffect(() => {
        coachService.getCoaches().then((response) => {
          setData(() => response.data);
        });
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

            {data!==null && (data.map((data) => (
              <Grid item key={data.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
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
                      Email: {data.email} <br/>
                      Years of experience: {data.yearsOfExperience}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View available terms</Button>
                    
                  </CardActions>
                </Card>
              </Grid>
            )))}
          </Grid>
        </Container>
      </main>
    
    </ThemeProvider>
  );
}