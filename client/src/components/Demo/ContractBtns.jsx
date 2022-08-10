import { useState } from "react";
import useEth from "../../contexts/useEth";

function ContractBtns({ setValue }) {
  const { state: { contracts, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    try {
      const value = await contracts['SimpleStorage'].methods.read().call({ from: accounts[0] });
      const data = await contracts['First'].methods.getTests().call();
      console.log({data});
      console.log({name : data[0].name, age : data[0].age});
      setValue(value);
    } catch (error) {
      alert(error.message);
    }
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contracts['SimpleStorage'].methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
