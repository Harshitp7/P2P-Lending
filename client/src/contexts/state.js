const actions = {
  init: "INIT",
  setContract: "SET_CONTRACT",
  setUser : "SET_USER",
  logout: "LOGOUT"
};

const initialState = {
  web3: null,
  artifacts: [],
  accounts: null,
  networkID: null,
  contracts : {},
  user : null,
  loggedIn : false
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case actions.init:
      return { ...state, ...data };

    case actions.setContract:
      return { ...state, contracts: {...state.contracts, ...data} };

    case actions.setUser:
      localStorage.setItem('user', JSON.stringify(data));
      return { ...state, user: data, loggedIn: true };

    case actions.logout:
      localStorage.removeItem('user');
      return { ...state, user: null, accounts: null, loggedIn: false };
      
    default:
      throw new Error("Undefined reducer action type");
  }
};

export {
  actions,
  initialState,
  reducer
};
