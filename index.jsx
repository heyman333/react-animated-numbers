import React from "react";
import { Spring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const NUMBERS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
  6, 7, 8, 9,
];

// utils
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// lib
const AnimatedNumber = ({
  animateToNumber,
  fontStyle,
  configs,
  includeComma,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const keyCount = React.useRef(0);
  const animteTonumberString = includeComma
    ? Math.abs(animateToNumber).toLocaleString("en-US")
    : String(Math.abs(animateToNumber));
  const animateToNumbersArr = Array.from(animteTonumberString, Number).map(
    (x, idx) => (isNaN(x) ? animteTonumberString[idx] : x)
  );

  const [numberHeight, setNumberHeight] = React.useState(0);

  const numberDivRef = React.useRef(null);

  const setConfig = (configs, number, index) => {
    if (typeof configs === "function") {
      return configs(number, index);
    }
    return configs
      ? configs[getRandomIntInclusive(0, configs.length - 1)]
      : undefined;
  };

  React.useEffect(() => {
    const height = numberDivRef.current.getClientRects()?.[0]?.height;
    if (height) {
      setNumberHeight(height);
    }
  }, [animateToNumber, fontStyle]);

  return (
    <>
      {numberHeight !== 0 && (
        <div
          ref={ref}
          style={{ display: "flex", flexDirection: "row" }}
          className="animated-container"
        >
          {inView && animateToNumber < 0 && <div style={fontStyle}>-</div>}
          {inView &&
            animateToNumbersArr.map((n, index) => {
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
                    overflow: "hidden",
                  }}
                >
                  <Spring
                    key={`${keyCount.current++}`}
                    from={{
                      transform: "translateY(0px)",
                    }}
                    to={{
                      transform: `translateY(${
                        -1 * (numberHeight * animateToNumbersArr[index]) -
                        numberHeight * 20
                      })`,
                    }}
                    config={setConfig(configs, n, index)}
                  >
                    {(props) =>
                      NUMBERS.map((number, i) => (
                        <animated.div
                          key={i}
                          style={{ ...fontStyle,...props }}
                        >
                          {number}
                        </animated.div>
                      ))
                    }
                  </Spring>
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
    </>
  );
};

const Enhanced = React.memo(AnimatedNumber, (prevProps, nextProps) => {
    return prevProps.animateToNumber === nextProps.animateToNumber && prevProps.fontStyle === nextProps.fontStyle && prevProps.includeComma === nextProps.includeComma;
})

export default Enhanced;
