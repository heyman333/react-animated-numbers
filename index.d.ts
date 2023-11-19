import React from "react";
import { Transition } from "framer-motion";

export interface Props {
  animateToNumber: number;
  fontStyle?: React.CSSProperties;
  includeComma?: boolean;
  transitions?: (index: number) => Transition;
  locale?: string;
  className?: string;
}

declare const AnimatedNumber: React.FunctionComponent<Props>;

export default AnimatedNumber;
