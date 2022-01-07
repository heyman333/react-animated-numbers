/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom"
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AnimatedNumber from "../index.jsx";

// const originalClientHeight = Object.getOwnPropertyDescriptor(
//   HTMLElement.prototype,
//   "clientHeight"
// );
describe("AnimatedNumber", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 500,
    });
  });

//   afterAll(() => {
//     Object.defineProperty(HTMLElement.prototype, "clientHeight", {
//         configurable: true,
//         value: 0,
//       });
//   });

  test("should ", async () => {
    const { debug } = render(<AnimatedNumber animateToNumber={100} />);
    debug();
    // const Default = await screen.findByTestId("default");
  });
});
