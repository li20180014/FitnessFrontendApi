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

//Dodati ikonicu ili sliku + validacija polja + onChange 

const theme = createTheme();

export default function CreateBlog() {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const[title, setTitle]= useState("");
  const[category, setCategory]= useState("");
  const[text, setText]= useState("");
  const[imageSrc, setImageSrc]= useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    blogService
      .createPost(
        title,
        text,
        category,
        imageSrc
      )
      .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    console.log(message);
    console.log(successful);
  };

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
          {successful && (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Blog post created - <strong>Check it out!</strong>
            </Alert>
          )}
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

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Blog Category
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Diet"
                />
                <FormControlLabel
                  value="male"
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
            />

            <Button variant="contained" component="label" style={{ maxWidth: "11rem" }}>
              Upload File
              <input type="file" hidden />
            </Button>
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
    </ThemeProvider>
  );
}
