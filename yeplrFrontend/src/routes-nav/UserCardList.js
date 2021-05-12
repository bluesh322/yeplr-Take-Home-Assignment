import React from "react";
import UserCard from "./UserCard";
import { Box } from "@material-ui/core";

const UserCardList = ({ users }) => {
  return (
    <Box>
      {users.map(({ id, firstName, lastName, email, state }) => {
        return (
          <UserCard
            id={id}
            firstName={firstName}
            lastName={lastName}
            email={email}
            state={state}
            key={id}
          />
        );
      })}
    </Box>
  );
};

export default UserCardList;
