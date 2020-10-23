import React from 'react'
import { SpringConfig } from "react-spring"

export interface Props {
  animateToNumber: number
  fontStyle?: React.CSSProperties
  includeComma?: boolean
  config?: SpringConfig
  delay?: number
  onFrame?: () => void
  onFinish?: () => void
  onStart?: () => void
}

declare const AnimatedNumber: React.FunctionComponent<Props>

export default AnimatedNumber