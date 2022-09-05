import { actions, useEth } from "./contexts";
import "./App.css";
import UserLayout from "./layouts/UserLayout";
import AuthLayout from "./layouts/AuthLayout";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

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
  }, [dispatch])
  console.log({ state })
  return (
    <>
        {
          state?.accounts ? (
            <>
              {
                state?.user ? <UserLayout userType={state?.user?.userType} /> : <AuthLayout />
              }
            </>
          ) : (
            <div className="container d-flex w-100 h-100 justify-content-center align-items-center">
              <div className="loading">
                <div className="loading-text d-flex align-items-center">
                  <h1>Loading...</h1><CircularProgress size={30} sx={{ml : 3}} />
                </div>
                  <p>Please wait while we load the contract.</p>
              </div>
            </div>
          )
        }
    </>
  );
}

export default App;
