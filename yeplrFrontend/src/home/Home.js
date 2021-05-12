import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Container, Box, Button } from "@material-ui/core";

const Home = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <Container maxWidth="md">
      <h2 data-testid="resolved">Yeplr</h2>
      {currentUser ? (
        <Box m={2}>
          <p>Register a user or view the user list</p>
          <h2 data-testid="loggedInResolved">
            Welcome Back
          </h2>
          <Box m={1}>
            <Link to="/users" key="Users">
              <Button variant="contained" color="primary">
                View User List
              </Button>
            </Link>
          </Box>
          <Box m={1}>
            <Link to="/signup" key="Sign Up">
              <Button variant="contained" color="primary">
                Register A New User
              </Button>
            </Link>
          </Box>
          <Box>
            <Link
              onClick={logout}
              to="/"
              key="Log Out"
              
            >
              <Button variant="contained">
                Log Out
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <Box>
          <p>Register a user or login as admin</p>
          <Link to="/signup" key="Sign Up">
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Link>
          <Link to="/login" key="Login">
            <Button variant="contained" color="secondary">
              Admin Login
            </Button>
          </Link>
        </Box>
      )}
    </Container>
  );
};

export default Home;
