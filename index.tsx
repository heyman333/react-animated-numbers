import React from "react";
import { motion, Transition, useAnimation, useInView } from "motion/react";

const NUMBERS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
  6, 7, 8, 9,
];

interface Props {
  className?: string;
  animateToNumber: number;
  fontStyle?: React.CSSProperties;
  transitions?: (index: number) => Transition;
  includeComma?: boolean;
  locale?: string;
}

const AnimatedNumber = ({
  className,
  animateToNumber,
  fontStyle,
  transitions,
  includeComma,
  locale,
}: Props) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();
  const animateTonumberString = includeComma
    ? Math.abs(animateToNumber).toLocaleString(locale || "en-US")
    : String(Math.abs(animateToNumber));
  const animateToNumbersArr = Array.from(animateTonumberString, Number).map(
    (x, idx) => (isNaN(x) ? animateTonumberString[idx] : x)
  );

  const [numberHeight, setNumberHeight] = React.useState(0);
  const [numberWidth, setNumberWidth] = React.useState(0);

  const numberDivRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const rect = numberDivRef.current?.getClientRects()?.[0];
    if (rect) {
      setNumberHeight(rect.height);
      setNumberWidth(rect.width);
    }
  }, []);

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, animateToNumber, controls]);

  return (
    <span ref={ref}>
      {numberHeight !== 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            overflow: "hidden",
          }}
          className={className}
        >
          {animateToNumbersArr.map((n, index) => {
            if (typeof n === "string") {
              return (
                <div
                  key={index}
                  style={{ ...fontStyle, fontVariantNumeric: "tabular-nums" }}
                >
                  {n}
                </div>
              );
            }

            return (
              <motion.div
                key={`${n}_${index}`}
                style={{
                  height: numberHeight,
                  width: numberWidth,
                }}
                initial="hidden"
                variants={{
                  hidden: { y: 0 },
                  visible: {
                    y:
                      -1 *
                        (numberHeight *
                          (typeof animateToNumbersArr[index] === "number"
                            ? animateToNumbersArr[index]
                            : 0)) -
                      numberHeight * 20,
                  },
                }}
                animate={controls}
                transition={transitions?.(index)}
              >
                {NUMBERS.map((number, index) => (
                  <div
                    key={`${number}${index}`}
                    style={{ ...fontStyle, fontVariantNumeric: "tabular-nums" }}
                  >
                    {number}
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      )}

      <div
        ref={numberDivRef}
        style={{ position: "absolute", top: -9999, ...fontStyle }}
      >
        {0}
      </div>
    </span>
  );
};

const Enhanced = React.memo(AnimatedNumber, (prevProps, nextProps) => {
  return (
    prevProps.animateToNumber === nextProps.animateToNumber &&
    prevProps.fontStyle === nextProps.fontStyle &&
    prevProps.includeComma === nextProps.includeComma
  );
});

export default Enhanced;
