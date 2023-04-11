// path: App.test.tsx
// Jest test file for the App component

import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
