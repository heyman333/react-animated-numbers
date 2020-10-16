import React from 'react'
import { SpringConfig, config } from "react-spring"

export interface Props {
  animateToNumber: number
  fontStyle?: React.CSSProperties
  includeComma?: boolean
  config?: SpringConfig
}

declare const AnimatedNumber: React.FunctionComponent<Props>

export default AnimatedNumber