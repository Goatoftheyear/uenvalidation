import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";

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
//this is under assumption all characters are in upper case
const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const submittingForm = (message) => {
    setResult("Loading...");
    if (!message.length) {
      setResult("Please enter your UEN");
      return;
    }
    if (message.length < 9 || message.length > 10) {
      setResult("This UEN has invalid length");
      return;
    }
    //check for correct format, while under the entity type and
    //check for UEN not over current year
    if (
      /[TSR][0-9]{2}[A-Z]{2}[0-9]{4}[A-Z]/.test(message) &&
      ENTITY_TYPE.includes(message.substring(3, 5)) &&
      !(
        message.charAt(0) === "T" &&
        parseInt(message.substring(1, 3)) >
          new Date().getFullYear() %
            Math.pow(10, new Date().getFullYear().toString().length - 1)
      )
    ) {
      setResult("This UEN is under other entities");
    }
    //check for format check for UEN not over current year
    else if (
      /[0-9]{9}[A-Z]$/.test(message) &&
      parseInt(message.substring(0, 4)) > 1800 &&
      parseInt(message.substring(0, 4)) <= new Date().getFullYear()
    ) {
      setResult("This UEN is under local companies registered with ACRA");
    } else if (/[0-9]{8}[A-Z]$/.test(message) && message.length === 9) {
      setResult("This UEN is under businesses registered with ACRA");
    } else {
      setResult("This UEN is invalid");
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      submittingForm(text);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>UEN Validator</h1>
        <h2>Type in your UEN to check if it is valid</h2>
        <div>
          <input
            className="text-size"
            type="text"
            name="uen"
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={(e) => onKeyDown(e)}
          />
        </div>
        <Button onClick={(e) => submittingForm(text)} variant="contained">
          Validate
        </Button>
        <br />
        <p className="result">{result}</p>
      </header>
    </div>
  );
};

export default App;
