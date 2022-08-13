import { useEth } from "./contexts";
import Demo from "./components/Demo";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "client/src/components/Signin.js";
import SignUp from "client/src/components/Signup.js";
import Home from "client/src/components/Home.js";

function App() {
  const { state } = useEth();
  const email = localStorage.getItem("email");
  console.log({ state })
  return (
    <>
       <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route
            path="/Home"
            element={email ? <Home /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
