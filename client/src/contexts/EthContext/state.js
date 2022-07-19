const actions = {
  init: "INIT",
  setContract: "SET_CONTRACT"
};

const initialState = {
  web3: null,
  accounts: null,
  networkID: null,
  contracts : {}
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case actions.setContract:
      return { ...state, contracts: {...state.contracts, ...data} };
    default:
      throw new Error("Undefined reducer action type");
  }
};

export {
  actions,
  initialState,
  reducer
};
