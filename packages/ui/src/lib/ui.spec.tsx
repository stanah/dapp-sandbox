import * as React from "react";
import { render } from "@testing-library/react";

import { Button } from "./ui";

describe("Ui", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Button />);
    expect(baseElement).toBeTruthy();
  });
});
