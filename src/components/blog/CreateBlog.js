import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import blogService from "../../services/blog.service";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';


const theme = createTheme();

export default function CreateBlog() {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();

    if(!title || !category || !text || !imageSrc ||
      title == 'undefined' || text == 'undefined' || imageSrc == 'undefined' ||
      category == 'undefined')
      {
           alert('Please fill in all required fileds!')
           return;
      }


    console.log(category);
    blogService.createPost(title, text, category, imageSrc).then(
      (response) => {
        setMessage(response.data.message);
        setSnackbarMessage("Successfully added new blog post!");
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
          setSnackbarMessage(resMessage);
        }else{
          setSnackbarMessage("Error adding new blog post!");
        }
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
    console.log(message);
    console.log(successful);
  };


  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeText = (e) => {
    const text = e.target.value;
    setText(text);
  };

  const onChangeLink = (e) => {
    const link = e.target.value;
    setImageSrc(link);
  };

  const handleCategoryChange =(e)=>{
    const cat = e.target.value;
    setCategory(cat);
  }

  return (
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
            Create New Post
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
              id="Title"
              label="Blog Title"
              name="title"
              autoFocus
              onChange={onChangeTitle}
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

            <FormControl onChange={handleCategoryChange}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Blog Category
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="DIET"
                  control={<Radio />}
                  label="Diet"
                />
                <FormControlLabel
                  value="WORKOUT"
                  control={<Radio />}
                  label="Workout"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              id="outlined-textarea"
              label="Write your own text..."
              rows={6}
              multiline
              onChange={onChangeText}
            />

            <TextField
              margin="normal"
              required
              id="imageSrc"
              label="Image Link"
              name="imageSrc"
              onChange={onChangeLink}
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
