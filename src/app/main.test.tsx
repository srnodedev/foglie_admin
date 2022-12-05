import { render } from "@testing-library/react";
import React from "react";

import { Main } from "./main";

test("renders learn react link", () => {
  const { getByText } = render(<Main />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
