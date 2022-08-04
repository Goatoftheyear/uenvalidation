import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const ENTITY_TYPE = [
  "LP",
  "LL",
  "FC",
  "PF",
  "RF",
  "MQ",
  "MM",
  "NB",
  "CC",
  "CS",
  "MB",
  "FM",
  "GS",
  "DP",
  "CP",
  "NR",
  "CM",
  "CD",
  "MD",
  "HS",
  "VH",
  "CH",
  "MH",
  "CL",
  "XL",
  "CX",
  "HC",
  "RP",
  "TU",
  "TC",
  "FB",
  "FN",
  "PA",
  "PB",
  "SS",
  "MC",
  "SM",
  "GA",
  "GB",
];
const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const submittingForm = (message) => {
    if (
      message.length < 9 ||
      message.length > 10 ||
      /[a-zA-Z]$/.test(message) === false
    ) {
      setResult("This UEN has invalid length");
      return;
    }
    if (
      /[TSR][0-9]{2}[A-Z]{2}[0-9]{4}[A-Z]/.test(message) &&
      ENTITY_TYPE.includes(message.substring(3, 5))
    ) {
      //add the list of entities later
      setResult("This is under other entities");
    } else if (
      /[0-9]{9}[A-Z]$/.test(message) &&
      parseInt(message.substring(0, 4)) > 1800 &&
      parseInt(message.substring(0, 4)) <= new Date().getFullYear()
    ) {
      setResult("Local companies registered with ACRA");
    } else if (/[0-9]{8}[A-Z]$/.test(message) && message.length === 9) {
      setResult("Businesses registered with ACRA");
    } else {
      setResult("This UEN is invalid");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Type in your UEN to check if it is valid</h1>
        <input
          type="text"
          name="uen"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <br />
        <button onClick={(e) => submittingForm(text)}>Submit</button>
        <br />
        <h2>{result}</h2>
      </header>
    </div>
  );
};

export default App;
