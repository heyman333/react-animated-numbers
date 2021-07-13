import React, { useCallback } from "react";
import { Spring, animated } from "react-spring";

const NUMBERS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5,
  6, 7, 8, 9,
];

const usePrevious = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });

  if (typeof ref.current === "undefined") {
    return 0;
  }

  return ref.current;
};

const AnimatedNumber = ({
  animateToNumber,
  fontStyle,
  config,
  includeComma,
  delay,
  onFinish,
  onStart,
  animationType = "random",
}) => {
  const prevNumber = usePrevious(animateToNumber);
  const animteTonumberString = String(Math.abs(animateToNumber));
  const prevNumberString = String(Math.abs(prevNumber));
  const animateToNumbersArr = Array.from(animteTonumberString, Number);
  const prevNumbersArr = Array.from(prevNumberString, Number);
  const [onStarted, setOnStarted] = React.useState(false);
  const [onFinished, setOnFinished] = React.useState(false);

  React.useEffect(() => {
    if (onStarted && onStart) {
      const delayTime = typeof delay === "undefined" ? 0 : delay;

      setTimeout(() => {
        onStart();
        setOnStarted(false);
      }, delayTime);

      if (onFinish && animationType === "random") {
        const delayTime =
          typeof config?.duration === "undefined" ? 500 : config.duration;
        setTimeout(() => {
          onFinish();
        }, delayTime);
      }
    }
  }, [onStarted]);

  if (includeComma) {
    const reducedArray = new Array(
      Math.ceil(animteTonumberString.length / 3)
    ).fill(0);

    const startReducedArray = new Array(
      Math.ceil(prevNumberString.length / 3)
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

    startReducedArray.forEach((__, index) => {
      if (index === 0) {
        return;
      }

      prevNumbersArr.splice(prevNumberString.length - index * 3, 0, ",");
    });
  }

  const [numberHeight, setNumberHeight] = React.useState(0);

  const numberDivRef = React.useRef(null);

  const getDelay = useCallback(
    (index) => {
      const sliced = animateToNumbersArr.slice(index);
      const gap = sliced.filter((item) => typeof item === "string").length;

      if (delay) {
        return delay + (animateToNumbersArr.length - 1 - index - gap) * 200;
      }

      if (config && config.duration) {
        return (
          (animateToNumbersArr.length - 1 - index - gap) *
          Math.max(100, config.duration - 300)
        );
      }

      return (animateToNumbersArr.length - 1 - index - gap) * 200;
    },
    [animateToNumbersArr, onFinished]
  );

  React.useEffect(() => {
    setNumberHeight(numberDivRef.current.clientHeight);
  }, [animateToNumber]);

  return (
    <>
      {numberHeight !== 0 && (
        <div style={{ display: "flex", flexDirection: "row" }}>
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
                  delay={animationType === "calm" ? getDelay(index) : null}
                  onRest={() => setOnFinished(true)}
                  onStart={() => setOnStarted(true)}
                  config={config}
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
