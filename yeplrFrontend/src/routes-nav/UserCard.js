import React, { useState, useEffect, useContext, useParams } from "react";
import { Card, CardContent, Typography, Button, Box } from "@material-ui/core";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom";


const UserCard = ({id, firstName, lastName, email, state }) => {
  return (
    <Box my={2}>
      <Card>
        <CardContent>
          <Link to={`/users/${id}`} key="Users">
            <Typography>{firstName}</Typography>
            <Typography>{lastName}</Typography>
          </Link>
          <Typography>{email}</Typography>
          <Typography>State: {state}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserCard;
