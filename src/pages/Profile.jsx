import {
  Box,
  Card,
  Typography,
  Divider,
  IconButton,
  Snackbar,
  Tooltip,
  Button,
  TextField,
  CardContent,
  LinearProgress,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import React, { useEffect, useState } from "react";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
const Profile = () => {
  const [user, setUser] = useState();
  const [editMode, setEditMode] = useState(false);
  const [newUserData, setNewUserData] = useState(user);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const fetchUser = (email) => {
    userService
      .getUserProfile(email)
      .then((response) => {
        setUser(response.data);
        setNewUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const email = authService.getCurrentToken().sub;
    if (!email) return;
    fetchUser(email);
  }, []);

  const cancelChanges = () => {
    setEditMode(false);
    setNewUserData(user);
  };

  const saveChanges = () => {
    setUser(newUserData);
    userService
      .updateUser(newUserData)
      .then((response) => {
        setSnackbarMessage("Successfully edited user profile!");
        console.log(response);
      })
      .catch((error) => {
        setSnackbarMessage("Error editing user profile!");
        console.log(error);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      {user && (
        <Card elevation={3}>
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={user.imageSrc}
                sx={{ width: 56, height: 56 }}
              />
              <Typography ml="15px" sx={{ fontSize: "1.2em" } }>User Profile</Typography>
              <Tooltip title="Edit profile info">
                <Button
                  sx={{ ml: "auto", p: 2, mr: 3 }}
                  color="primary"
                  onClick={() => setEditMode(!editMode)}
                  endIcon={<EditIcon sx={{ fontSize: "1.8em" }} />}
                >
                  Edit profile
                </Button>
              </Tooltip>
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            {newUserData ? (
              <Box>
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  {editMode ? (
                    <Box>
                      <TextField
                        value={newUserData.firstName}
                        label="FirstName"
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            firstName: e.target.value,
                          })
                        }
                        variant="filled"
                        InputProps={{
                          style: { fontSize: 40 },
                        }}
                      />
                      <TextField
                        value={newUserData.lastName}
                        label="LirstName"
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            lastName: e.target.value,
                          })
                        }
                        variant="filled"
                        InputProps={{
                          disableUnderline: !editMode,
                          style: { fontSize: 40 },
                        }}
                      />
                    </Box>
                  ) : (
                    <Typography fontSize={40}>
                      {`${newUserData.firstName} ${newUserData.lastName}`}
                    </Typography>
                  )}
                </Box>
                <Divider sx={{ mt: 2, mb: 2 }} />
                {editMode ? (
                  <Box>
                    <TextField
                      disabled
                      value={newUserData.email}
                      label="Email"
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          email: e.target.value,
                        })
                      }
                      variant="filled"
                      InputProps={{
                        style: { fontSize: 30 },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography fontSize={30}>{`${user.email}`}</Typography>
                )}
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box>
                  Physical characteristics
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      "& > *": {
                        mb: 2,
                        mr: 2,
                        width: "12.5%",
                        minWidth: "145px",
                        "&:hover": {
                          backgroundColor: "primary.light",
                          color: "white",
                        },
                        cursor: "pointer",
                        transition: ".3s all",
                      },
                    }}
                    elevation={5}
                  >
                    <Card sx={{ p: 2 }}>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary">
                        Height
                      </Typography>
                      {editMode ? (
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                          <TextField
                            id="outlined-number"
                            type="number"
                            variant="standard"
                            value={newUserData.height}
                            onChange={(e) =>
                              setNewUserData({
                                ...newUserData,
                                height: e.target.value,
                              })
                            }
                          />{" "}
                          cm
                        </Box>
                      ) : (
                        <Box>
                          <Typography sx={{ fontSize: 26 }}>
                            {newUserData.height ? (
                              <div>
                                {newUserData.height}
                                <span style={{ fontSize: 16 }}>cm</span>
                              </div>
                            ) : (
                              "N/A"
                            )}
                          </Typography>
                        </Box>
                      )}
                    </Card>
                    <Card sx={{ p: 2 }}>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary">
                        Weight
                      </Typography>
                      {editMode ? (
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                          <TextField
                            id="outlined-number"
                            type="number"
                            variant="standard"
                            value={newUserData.weight}
                            onChange={(e) =>
                              setNewUserData({
                                ...newUserData,
                                weight: e.target.value,
                              })
                            }
                          />
                          kg
                        </Box>
                      ) : (
                        <Box>
                          <Typography sx={{ fontSize: 26 }}>
                            {newUserData.weight ? (
                              <div>
                                {newUserData.weight}
                                <span style={{ fontSize: 16 }}>kg</span>
                              </div>
                            ) : (
                              "N/A"
                            )}
                          </Typography>
                        </Box>
                      )}
                    </Card>
                    <Card sx={{ p: 2 }}>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary">
                        Age
                      </Typography>
                      {editMode ? (
                        <TextField
                          id="outlined-number"
                          type="number"
                          variant="standard"
                          value={newUserData.age}
                          onChange={(e) =>
                            setNewUserData({
                              ...newUserData,
                              age: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Box>
                          <Typography sx={{ fontSize: 26 }}>
                            {newUserData.age ? (
                              <div>{newUserData.age}</div>
                            ) : (
                              "N/A"
                            )}
                          </Typography>
                        </Box>
                      )}
                    </Card>
                    <Card sx={{ p: 2 }}>
                      <Typography sx={{ fontSize: 16 }} color="text.secondary">
                        Gender
                      </Typography>
                      {editMode ? (
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                              newUserData.gender
                                ? newUserData.gender.toUpperCase()
                                : null
                            }
                            onChange={(e) =>
                              setNewUserData({
                                ...newUserData,
                                gender: e.target.value,
                              })
                            }
                          >
                            <MenuItem value={"MALE"}>Male</MenuItem>
                            <MenuItem value={"FEMALE"}>Female</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <Box>
                          <Typography sx={{ fontSize: 26 }}>
                            {newUserData.gender ? (
                              <div>{newUserData.gender}</div>
                            ) : (
                              "N/A"
                            )}
                          </Typography>
                        </Box>
                      )}
                    </Card>
                  </Box>
                </Box>
                {editMode && (
                  <Box>
                    <Tooltip title="Submit Changes">
                      <Button
                        sx={{ ml: "auto", p: 2, mr: 3, mt: 3 }}
                        color="primary"
                        variant="contained"
                        onClick={saveChanges}
                        endIcon={<SaveIcon sx={{ fontSize: "1.8em" }} />}
                      >
                        Save
                      </Button>
                    </Tooltip>
                    <Tooltip title="Cancel Chages">
                      <Button
                        sx={{ ml: "auto", p: 2, mr: 3, mt: 3 }}
                        color="primary"
                        variant="outlined"
                        onClick={() => cancelChanges()}
                      >
                        Cancel
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </Box>
            ) : (
              <LinearProgress />
            )}
          </CardContent>
        </Card>
      )}
      <Snackbar
        open={snackbarMessage != ""}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Profile;
