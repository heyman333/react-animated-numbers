import React from "react";
import { SpringConfig } from "@react-spring/web";

type configsFn = (numberValue: number, index: number) => SpringConfig;

export interface Props {
  animateToNumber: number;
  fontStyle?: React.CSSProperties;
  includeComma?: boolean;
  configs?: SpringConfig[] | configsFn;
  locale?: string;
}

declare const AnimatedNumber: React.FunctionComponent<Props>;

export default AnimatedNumber;
