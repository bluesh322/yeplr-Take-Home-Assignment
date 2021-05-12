import React, { useState, useEffect } from "react";
import { Container, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import UserCardList from "./UserCardList";
import YeplrApi from "../Api";
const UserList = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    let users = await YeplrApi.getUsers();
    setUsers(users);
    setIsLoading(false);
  };

  if (isLoading) {
    return <span data-testid="loading">Loading ...</span>;
  }

  return (
    <Container maxWidth="md" fixed>
      {users.length ? (
        <Box m={2}>
          <UserCardList users={users}></UserCardList>
          <Link to="/" key="Users">
            <Button variant="contained" color="primary">
              Go Back
            </Button>
          </Link>
        </Box>
      ) : (
        <span>Sorry, no results were found</span>
      )}
    </Container>
  );
};

export default UserList;
