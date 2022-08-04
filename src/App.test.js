import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders if render things are on the screen", () => {
  const screen = render(<App />);
  expect(screen.getByText("Type in your UEN to check if it is valid"));
  expect(
    screen.getByRole("textbox", {
      name: "",
    })
  );
  expect(screen.getByRole("button", { name: "Submit" }));
});

// test("type", () => {
//   const screen = render(<App />);

//   userEvent.type(screen.getByRole("input"), "Hello,{enter}World!");
// });
