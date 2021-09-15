import React from "react";
import { Spring, animated } from "react-spring";

const NUMBERS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
  6, 7, 8, 9,
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AnimatedNumber = ({
  animateToNumber,
  fontStyle,
  configs,
  includeComma,
}) => {
  const animteTonumberString = String(Math.abs(animateToNumber));
  const animateToNumbersArr = Array.from(animteTonumberString, Number);

  if (includeComma) {
    const reducedArray = new Array(
      Math.ceil(animteTonumberString.length / 3)
    ).fill(0);

    reducedArray.forEach((__, index) => {
      if (index === 0) {
        return;
      }

      animateToNumbersArr.splice(
        animteTonumberString.length - index * 3,
        0,
        ","
      );
    });
  }

  const [numberHeight, setNumberHeight] = React.useState(0);

  const numberDivRef = React.useRef(null);

  React.useEffect(() => {
    setNumberHeight(numberDivRef.current.clientHeight);
  }, [animateToNumber]);

  return (
    <>
      {numberHeight !== 0 && (
        <div
          style={{ display: "flex", flexDirection: "row" }}
          className="animated-container"
        >
          {animateToNumber < 0 && <div style={fontStyle}>-</div>}
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
                  overflow: "hidden",
                }}
              >
                <Spring
                  key={animateToNumbersArr[index]}
                  from={{
                    transform: "translateY(0px)",
                  }}
                  to={{
                    transform: `translateY(${
                      -1 * (numberHeight * animateToNumbersArr[index]) -
                      numberHeight * 20
                    })`,
                  }}
                  config={
                    configs
                      ? configs[getRandomIntInclusive(0, configs.length - 1)]
                      : undefined
                  }
                >
                  {(props) =>
                    NUMBERS.map((number, i) => (
                      <animated.div key={i} style={{ ...props, ...fontStyle }}>
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

export default AnimatedNumber;
