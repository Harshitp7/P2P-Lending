import { useContext } from "react";
import { EthContext } from ".";

const useEth = () => useContext(EthContext);

export default useEth;
