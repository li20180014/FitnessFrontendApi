import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Typography, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import blogService from "../../services/blog.service";

export default function BlogPost() {
  const [allowDelete, setAllowDelete] = useState(false);
  const location = useLocation();
  const { blogPost } = location.state;
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const token = authService.getCurrentToken();
    if (token) {
      const user = token.sub;
      if (user === blogPost.user.email) {
        setAllowDelete(true);
      }
    }
  }, []);

  const handleClick = () =>{
    blogService.deleteBlog(blogPost.id).then(
        (response) => {
            
          setMessage(response.data.message);
          setSuccessful(true);
          navigate('/blog');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            console.log(resMessage);

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    console.log(message);
    console.log(successful);
  
  }

  return (
    <Stack
      gap="60px"
      sx={{ flexDirection: { lg: "row" }, p: "20px", alignItems: "center" }}
      justifyContent="center"
    >
      <img src={blogPost.imageSrc} loading="lazy" className="detail-image" />
      <Stack sx={{ gap: { lg: "35px", xs: "20px" } }} width="50%">
        <Typography
          sx={{ fontSize: { lg: "64px", xs: "30px" } }}
          fontWeight={700}
          color="black"
          textTransform="capitalize"
        >
          {blogPost.title}
        </Typography>
        <Typography
          sx={{ fontSize: { lg: "24px", xs: "18px" } }}
          color="#4F4C4C"
          textAlign="justify"
        >
          {blogPost.text}
        </Typography>
       
        <Typography
          sx={{ fontSize: { lg: "16px", xs: "14px" } } }
          color="#4F4C4C"
        >
          Written by: {blogPost.user.firstName} {blogPost.user.lastName}
        </Typography>
        {allowDelete && (
          <Button variant="contained" style={{ maxWidth: "11rem" }} onClick={handleClick}>
            Delete Blog
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
