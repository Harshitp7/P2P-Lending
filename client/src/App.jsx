import { actions, useEth } from "./contexts";
// import Demo from "./components/Demo";
import "./App.css";
import UserLayout from "./layouts/UserLayout";
import AuthLayout from "./layouts/AuthLayout";
import { Box, TextField } from "@mui/material";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  
  Route
} from 'react-router-dom'
import SignUpBorrower from "./pages/Auth/SignUpBorrower";
import SignUpLender from "./pages/Auth/SignUpLender";

function App() {
  const { state, dispatch } = useEth();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      dispatch({
        type: actions.setUser,
        data: JSON.parse(userData)
      });
    }
  }, [])
  console.log({ state })
  return (
    <>
   
      <div>
        {
          state?.accounts ? (
            <div >
              {
                state?.user ? <UserLayout userType={state?.user?.userType} /> : <AuthLayout />
              }
            </div>
          ) : (
            <div className="container">
              <div className="loading">
                <div className="loading-text">
                  <h1>Loading...</h1>
                  <p>Please wait while we load the contract.</p>
                </div>
              </div>
            </div>
          )
        }
      </div>
     
     
    </>
  );
}

export default App;
