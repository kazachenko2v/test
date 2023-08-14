import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

import { Provider } from "react-redux";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  filter: { page: 0 },
  companies: { items: [], status: "loading" },
};

const store = mockStore(initialState);

describe("With React Testing Library", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  it("Shows Buttons", () => {
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("Click on Prev Button on init page", () => {
    expect(screen.getByText(/prev/i)).toBeDisabled();
  });
});
