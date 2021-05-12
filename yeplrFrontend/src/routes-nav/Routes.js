import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../home/Home";
import NewUserForm from "../auth/NewUserForm";
import LoginForm from "../auth/LoginForm";
import PrivateRoute from "./PrivateRoute";
import UserList from "./UserList";
import UserDetails from "./UserDetails";


const Routes = ({login, signup, logout}) => {
  return (
    <Switch>
      <Route exact path="/">
          <Home logout={logout}></Home>
      </Route>
      <Route exact path="/signup">
          <NewUserForm signup={signup}></NewUserForm>
      </Route>
      <Route exact path="/login">
          <LoginForm login={login}></LoginForm>
      </Route>
      <PrivateRoute exact path="/users">
          <UserList></UserList>
      </PrivateRoute>
      <PrivateRoute exact path="/users/:id">
          <UserDetails></UserDetails>
      </PrivateRoute>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
