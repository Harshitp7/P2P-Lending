import { useContext } from "react";
import { EthContext } from ".";
// import EthContext from "./index";

const useEth = () => useContext(EthContext);

export default useEth;
