import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  btn: {
    width: 100,
    marin: theme.spacing(2),
  },
  text: {
    display: "flex",
  },
}));

const NewUserForm = ({ signup }) => {
  const classes = useStyles();
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    state: "",
  };
  const history = useHistory();
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.state === "active") {
      const { firstName, lastName, email, state } = formData;
      signup({ firstName, lastName, email, state });
    } else {
      const { firstName, lastName, email } = formData;
      signup({ firstName, lastName, email });
    }
    setFormData(INITIAL_STATE);
    history.push("/");
  };

  return (
    <Container justifycontent="center" maxWidth="md" fixed>
      <Box className={classes.root} my={2}>
        <Typography className={classes.text} variant="h3">
          Welcome to Yeplr!
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              id="firstName"
              className={clsx(
                classes.margin,
                classes.withoutLabel,
                classes.textField
              )}
              variant="outlined"
              label="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            ></TextField>
            <TextField
              id="lastName"
              className={clsx(
                classes.margin,
                classes.withoutLabel,
                classes.textField
              )}
              variant="outlined"
              label="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            ></TextField>
            <TextField
              id="email"
              className={clsx(
                classes.margin,
                classes.withoutLabel,
                classes.textField
              )}
              variant="outlined"
              label="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></TextField>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                State
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={formData.state}
                name="state"
                onChange={handleChange}
                label="State"
              >
                <MenuItem value="active">active</MenuItem>
                <MenuItem value="pending">pending</MenuItem>
              </Select>
            </FormControl>
            <Box my={2}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign Up!
            </Button>
            </Box>
            <Box my={2}>
            <Link to="/" key="Users">
              <Button variant="contained" color="primary">
                Go Back
              </Button>
            </Link>
            </Box>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};

export default NewUserForm;
