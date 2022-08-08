import { useState } from "react";
import useEth from "../../contexts/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import Desc from "./Desc";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();
  const [value, setValue] = useState("?");
  console.log({state})

  const demo =
    <>
      <Cta />
      <div className="contract-container">
        <Contract value={value} />
        <ContractBtns setValue={setValue} />
      </div>
      <Desc />
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.contracts ? <NoticeNoArtifact /> :
          !state.contracts ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
