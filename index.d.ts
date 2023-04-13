import React from "react";
import {MotionProps} from "framer-motion"

type configsFn = (numberValue: number, index: number) => MotionProps;

export interface Props {
  animateToNumber: number;
  fontStyle?: React.CSSProperties;
  includeComma?: boolean;
  configs?: MotionProps[] | configsFn;
  locale?: string;
}

declare const AnimatedNumber: React.FunctionComponent<Props>;

export default AnimatedNumber;
