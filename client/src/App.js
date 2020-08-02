import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import UserContext from "./context/userContext";
import "./App.css";
import Home from "./components/pages/home";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          {/* <Header /> */}
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
