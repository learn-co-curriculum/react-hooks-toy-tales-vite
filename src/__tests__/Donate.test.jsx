
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import App from "../components/App";
import "@testing-library/jest-dom";

describe("Deleting a Toy", () => {
  it("removes the toy when donate button is clicked", async () => {
    global.setFetchResponse(global.baseToys);

    render(<App />);

    const woody = await screen.findByText("Woody");
    expect(woody).toBeInTheDocument();

    const donateButtons = screen.getAllByText(
      "Donate to Goodwill"
    );

    fireEvent.click(donateButtons[0]);

    await waitFor(() => {
      expect(
        screen.queryByText("Woody")
      ).not.toBeInTheDocument();
    });
  });
});
