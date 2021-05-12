import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YeplrApi from "../Api";
import { Container, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const CompanyDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setUser(await YeplrApi.getUserById(id));
    };
    getUser();
  }, [id]);

  if (!user) return <span>Loading ...</span>;

  return (
    <Container maxWidth="md" fixed>
      <h3>{user.firstName}</h3>
      <h3>{user.lastName}</h3>
      <p>{user.email}</p>
      <p>{user.state}</p>
      <Link to="/" key="Users">
        <Button variant="contained" color="primary">
          Go Back
        </Button>
      </Link>
    </Container>
  );
};

export default CompanyDetails;
