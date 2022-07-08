import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography, Button } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "../components/blog/MainFeaturedPost";
import FeaturedPost from "../components/blog/FeaturedPost";
import blogService from "../services/blog.service";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { Box } from "@mui/system";

const theme = createTheme();

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    blogService.getBlogs().then((response) => {
      setPosts(() => response.data);
    });
  }, []);

  useEffect(() => {
    const token = authService.getCurrentToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/create-blog");
    } else {
      setAlert(true);
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {alert && (
          <Box mt="40px">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is a premium feature — <strong>you must login!</strong>
          </Alert>
          </Box>
        )}
        <main>
          {/* <MainFeaturedPost post={mainPost}  />  */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { lg: "44px", xs: "30px" } }}
            mb="40px"
            mt="40px"
            textAlign="center"
          >
            Browse Blogs
          </Typography>
          <Button onClick={handleClick} variant="contained">
            Create New Post
          </Button>
          <Grid container spacing={4} mt="8px">
            {posts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
