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
        if(!Web3.givenProvider) {
          alert("Please enable MetaMask to use this app");
          return;
        }
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        try {
          artifacts.forEach(artifact => {
            const contract = new web3.eth.Contract(artifact.abi, artifact.networks[networkID].address);
            dispatch({
              type: actions.setContract,
              data: { [artifact.contractName] : contract }
            });
          })
          dispatch({
            type: actions.init,
            data: {web3, accounts, networkID }
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
        const artifact1 = require("../../contracts/SimpleStorage.json");
        const artifact2 = require("../../contracts/First.json");
        init([artifact1, artifact2]);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

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
