import React from "react";
import { SpringConfig } from "@react-spring/web";

export interface Props {
  animateToNumber: number;
  fontStyle?: React.CSSProperties;
  includeComma?: boolean;
  configs?: SpringConfig[];
}

declare const AnimatedNumber: React.FunctionComponent<Props>;

export default AnimatedNumber;
