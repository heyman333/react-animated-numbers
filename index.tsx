import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, type Transition } from "motion/react";

const generateRandomSequence = (target: number, length = 40): number[] => {
  const base = Array.from({ length: length - 1 }, () =>
    Math.floor(Math.random() * 10)
  );
  return [...base, target];
};

interface Props {
  className?: string;
  animateToNumber: number;
  fontStyle?: React.CSSProperties;
  transitions?: (index: number) => Transition;
  useThousandsSeparator?: boolean;
  locale?: string;
}

const AnimatedNumber = ({
  className,
  animateToNumber,
  fontStyle,
  transitions,
  useThousandsSeparator = false,
  locale = "en-US",
}: Props) => {
  const wrapperRef = useRef(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: false });
  const controls = useAnimation();

  const [numberHeight, setNumberHeight] = useState(0);
  const [numberWidth, setNumberWidth] = useState(0);
  const [randomSequences, setRandomSequences] = useState<(number[] | string)[]>(
    []
  );

  const animateNumberStr = useThousandsSeparator
    ? Math.abs(animateToNumber).toLocaleString(locale)
    : String(Math.abs(animateToNumber));

  const animateDigits = Array.from(animateNumberStr).map((char) =>
    /\d/.test(char) ? Number(char) : char
  );

  useEffect(() => {
    const newSeq = animateDigits.map((digit) =>
      typeof digit === "number" ? generateRandomSequence(digit) : digit
    );
    setRandomSequences(newSeq);
  }, [animateDigits, animateToNumber]);

  useEffect(() => {
    if (!numberRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height, width } = entry.contentRect;
        setNumberHeight(height);
        setNumberWidth(width);
      }
    });
    observer.observe(numberRef.current);
    return () => observer.disconnect();
  }, [fontStyle]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView, randomSequences]);

  return (
    <span
      ref={wrapperRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {numberHeight > 0 && (
        <div
          className={className}
          style={{
            display: "flex",
            overflow: "hidden",
            flexDirection: "row",
            position: "relative",
          }}
        >
          {randomSequences.map((seq, index) => {
            if (typeof seq === "string") {
              return (
                <div
                  key={`static-${index}`}
                  style={{
                    ...fontStyle,
                    fontVariantNumeric: "tabular-nums",
                    width: numberWidth,
                    textAlign: "center",
                  }}
                >
                  {seq}
                </div>
              );
            }

            return (
              <motion.div
                key={`motion-${index}-${animateToNumber}`}
                initial={{ y: 0 }}
                animate={{ y: -1 * numberHeight * (seq.length - 1) }}
                transition={
                  transitions?.(index) ?? {
                    duration: 1.8 + index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }
                }
                style={{
                  height: numberHeight,
                  width: numberWidth,
                  position: "relative",
                }}
              >
                {seq.map((num, i) => {
                  const isTarget = i === seq.length - 1;
                  return (
                    <motion.div
                      key={`digit-${index}-${i}`}
                      style={{
                        ...fontStyle,
                        fontVariantNumeric: "tabular-nums",
                        height: numberHeight,
                        textAlign: "center",
                        opacity: isTarget ? 1 : 0.2,
                        scale: isTarget ? 1 : 0.9,
                      }}
                      animate={
                        isTarget
                          ? {
                              scale: [1.2, 1],
                              opacity: [0.6, 1],
                            }
                          : {}
                      }
                      transition={
                        isTarget
                          ? {
                              duration: 0.4,
                              delay: 1.8 + index * 0.1,
                              ease: "easeOut",
                            }
                          : {}
                      }
                    >
                      {num}
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Measurement element (for measuring number size) */}
      <div
        ref={numberRef}
        style={{
          position: "absolute",
          top: -9999,
          visibility: "hidden",
          ...fontStyle,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        0
      </div>
    </span>
  );
};

export default AnimatedNumber;
