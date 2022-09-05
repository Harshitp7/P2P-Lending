import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifacts => {
      console.log({ artifacts });
      if (artifacts.length > 0) {
        try {
          if(!Web3.givenProvider) {
            throw new Error("Please enable MetaMask to use this app");
          }
          const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
          const accounts = await web3.eth.requestAccounts();
          const networkID = await web3.eth.net.getId();
          const networkType = await web3.eth.net.getNetworkType();

          const hostedNetworkType = process.env.NODE_ENV === "production" ? "goerli" : "private";

          if(networkType !== hostedNetworkType) {
            throw new Error(`Please connect to ${hostedNetworkType} network and refresh the page`);
          }
          artifacts.forEach(artifact => {
            const contract = new web3.eth.Contract(artifact.abi, artifact.networks[networkID].address);
            dispatch({
              type: actions.setContract,
              data: { [artifact.contractName] : contract }
            });
          })
          dispatch({
            type: actions.init,
            data: {web3, accounts, networkID, artifacts}
          });
        } catch (err) {
          console.error(err);
          alert(err.message)
        }
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact1 = require("../contracts/P2pLending.json");
        init([artifact1]);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init, state.loggedIn]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifacts);
      dispatch({
        type : actions.logout
      })
      console.log("changed");
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifacts]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
