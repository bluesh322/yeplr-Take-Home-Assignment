import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Routes from "./routes-nav/Routes";
import { BrowserRouter } from "react-router-dom";
import YeplrApi from "./Api";
import UserContext from "./auth/UserContext";

// Key name for storing JWT token in local storage
export const TOKEN_STORAGE_ID = "yeplr-token";

/**
 * Jobly application
 *
 * -infoLoaded: has user info been loaded? (manages "loading ...")
 *
 * -currentUser: user obj from API. Our way to see if a user is logged in,
 *  passed around via context.
 *
 * -token: for logged in users, this is auth JWT.
 *  Is required for most API calls, and is initially read from LocalStorage
 *  and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

const App = () => {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  /** Load user info from API. Until a user has a token it should not run.
   *  Will only rerun if a user logs out.
   */

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!token) {
        setCurrentUser(null);
      } else {
        try {
          YeplrApi.token = token;
        } catch (errors) {
          console.error("App loadUserInfo: problem loading", errors);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    };
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Signup
   *
   * Automatically logs them in upon signup.
   */

  const signup = async (registerData) => {
    try {
      let token = await YeplrApi.register(registerData);
      //setToken(token);
      return { success: true };
    } catch (errors) {
      console.log("signup failed", errors);
      return { success: false, errors };
    }
  };

  /** Login
   *
   *
   */
  const login = async (loginData) => {
    try {
      let token = await YeplrApi.adminLogin(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.log("login failed", errors);
      return { success: false, errors };
    }
  };

  const logout = async () => {
    setCurrentUser(null);
    setToken(null);
  };

  //if (!infoLoaded) return <span data-testid="loading">Loading ...</span>;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Routes login={login} signup={signup} logout={logout} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
