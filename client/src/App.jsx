import { useEth } from "./contexts";
import Demo from "./components/Demo";
import "./App.css";

function App() {
  const { state } = useEth();
  console.log({ state })
  return (
    <>
      <div id="App" >
        {
           state?.accounts ? (
            <div className="container">
            <Demo />
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
