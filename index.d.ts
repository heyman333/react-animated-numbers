import React from "react";
import { SpringConfig } from "react-spring";

type configsFn = ({numberValue, index}: {numberValue: number, index: number}) => SpringConfig;

export interface Props {
  animateToNumber: number;
  fontStyle?: React.CSSProperties;
  includeComma?: boolean;
  configs?: SpringConfig[] | configsFn;
}

declare const AnimatedNumber: React.FunctionComponent<Props>;

export default AnimatedNumber;
