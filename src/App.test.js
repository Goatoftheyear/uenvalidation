import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders if render things are on the screen", () => {
  const screen = render(<App />);
  expect(screen.getByText("UEN Validator"));
  expect(screen.getByText("Type in your UEN to check if it is valid"));
  expect(
    screen.getByRole("textbox", {
      name: "",
    })
  );
  expect(screen.getByRole("button", { name: "Validate" }));
});

test("button press", async () => {
  const screen = render(<App />);
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByText("Please enter your UEN"));
});
test("enter test", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "{enter}");
  expect(screen.getByText("Please enter your UEN"));
});

test("type valid A", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "12345678X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(!screen.getByDisplayValue("12345678X"));
  expect(screen.getByText("This UEN is under businesses registered with ACRA"));
});

test("type valid B", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "202256789X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("202256789X"));
  expect(
    screen.getByText("This UEN is under local companies registered with ACRA")
  );
});

test("type invalid B", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "123456789X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("123456789X"));
  expect(screen.getByText("This UEN is invalid"));
});

test("type valid C 1", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "S59CC5555X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("S59CC5555X"));
  expect(screen.getByText("This UEN is under other entities"));
});
test("type valid C 2", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "R90MM5569X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("R90MM5569X"));
  expect(screen.getByText("This UEN is under other entities"));
});
test("type valid C 3", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "T09GS8653X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("T09GS8653X"));
  expect(screen.getByText("This UEN is under other entities"));
});

test("type invalid C 1", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "T09GG5555X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("T09GG5555X"));
  expect(screen.getByText("This UEN is invalid"));
});

test("type invalid C 2", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "A09GG5555X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("A09GG5555X"));
  expect(screen.getByText("This UEN is invalid"));
});
test("type invalid C 3", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "T55GG5555X");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("T55GG5555X"));
  expect(screen.getByText("This UEN is invalid"));
});

test("type invalid numbers only 10 digits", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "1234567890");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("1234567890"));
  expect(screen.getByText("This UEN is invalid"));
});

test("type invalid numbers only 9 digits", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "123456789");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("123456789"));
  expect(screen.getByText("This UEN is invalid"));
});

test("type invalid format", async () => {
  const screen = render(<App />);
  await userEvent.type(screen.getByRole("textbox"), "T092GS1244");
  await userEvent.click(screen.getByRole("button", { name: "Validate" }));
  expect(screen.getByDisplayValue("T092GS1244"));
  expect(screen.getByText("This UEN is invalid"));
});
