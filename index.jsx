import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const NUMBERS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
  6, 7, 8, 9,
];

// lib
const AnimatedNumber = ({
  className,
  animateToNumber,
  fontStyle,
  transitions,
  includeComma,
  locale,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();
  const keyCount = React.useRef(0);
  const animteTonumberString = includeComma
    ? Math.abs(animateToNumber).toLocaleString(locale || "en-US")
    : String(Math.abs(animateToNumber));
  const animateToNumbersArr = Array.from(animteTonumberString, Number).map(
    (x, idx) => (isNaN(x) ? animteTonumberString[idx] : x)
  );

  const [numberHeight, setNumberHeight] = React.useState(0);

  const numberDivRef = React.useRef(null);

  React.useEffect(() => {
    const height = numberDivRef.current.getClientRects()?.[0]?.height;
    if (height) {
      setNumberHeight(height);
    }
  }, [animateToNumber, fontStyle]);

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, animateToNumber]);

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
                <div key={index} style={{ ...fontStyle }}>
                  {n}
                </div>
              );
            }

            return (
              <div
                key={index}
                style={{
                  height: numberHeight,
                }}
              >
                {NUMBERS.map((number) => (
                  <motion.div
                    style={fontStyle}
                    key={`${keyCount.current++}`}
                    initial="hidden"
                    variants={{
                      hidden: { y: 0 },
                      visible: {
                        y:
                          -1 * (numberHeight * animateToNumbersArr[index]) -
                          numberHeight * 20,
                      },
                    }}
                    animate={controls}
                    transition={transitions?.(index)}
                  >
                    {number}
                  </motion.div>
                ))}
              </div>
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
