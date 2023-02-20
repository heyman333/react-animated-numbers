<a href="https://www.npmjs.com/package/react-animated-numbers">
<img alt="npm version" src="http://img.shields.io/npm/v/react-animated-numbers.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/react-animated-numbers">
<img src="http://img.shields.io/npm/dm/react-animated-numbers.svg?style=flat-square">
</a>

# react-animated-numbers

Library showing animation of number changes in react.js

## Test

[Homepage](https://optimistic-noyce-cf2473.netlify.app/)

## Props

|      name       |              type              |    default     | description                                                                                                                                                                                                                                                                                               |
| :-------------: | :----------------------------: | :------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animateToNumber |             number             |      none      | Number to be animated                                                                                                                                                                                                                                                                                     |
|    fontStyle    |      React.CSSProperties?      |      none      | Style of number text                                                                                                                                                                                                                                                                                      |
|  includeComma   |            boolean?            |     false      | Whether the number contains commas                                                                                                                                                                                                                                                                        |
| locale          |           string?              |    en-US       | Formats animated number as per locale. Also it should be used with `inculdeComma` prop. For list of locales, search for "BCP 47 language tags"   |
|   configs(1)    |        SpringConfig[]?         | config.default | This module is using [react-spring](https://www.react-spring.io) and you can refer to this [config option](https://react-spring.io/common/configs). If you pass multiple settings, an animation is randomly assigned to each number. _ DO NOT USE `duration` because of a bug that hasn't been fixed yet_ |
|   configs(2)    | (number, number): SpringConfig | none | The first parameter gives information about the number to be changed, And the second parameter gives information about the order of the changing numbers. You can use that information to adjust the animation by returning the config                                                                    |

### Custom Style

- you can use className `animated-container` to style container ([example](https://github.com/heyman333/react-animated-numbers/blob/master/example/src/App.css))
- if you want to customize font style. Just ues `fontStyle` prop

### Next JS

You have to use dynamic imports to ensure that this library is imported on the client side only.

Import the library like this:

```
import dynamic from "next/dynamic";
const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});
```

Credit to @jedwardblack for [this](https://github.com/heyman333/react-animated-numbers/issues/40)


### Example

```js
import React from "react";
import AnimatedNumbers from "react-animated-numbers";
import "./App.css";

function App() {
  const [num, setNum] = React.useState(331231);
  return (
    <div className="container">
      <AnimatedNumbers
        includeComma
        animateToNumber={num}
        fontStyle={{ fontSize: 40 }}
        locale="en-US"
        configs={[
          { mass: 1, tension: 220, friction: 100 },
          { mass: 1, tension: 180, friction: 130 },
          { mass: 1, tension: 280, friction: 90 },
          { mass: 1, tension: 180, friction: 135 },
          { mass: 1, tension: 260, friction: 100 },
          { mass: 1, tension: 210, friction: 180 },
        ]}
      ></AnimatedNumbers>

      <AnimatedNumbers
        animateToNumber={num}
        fontStyle={{ fontSize: 32 }}
        configs={(number, index) => {
          return { mass: 1, tension: 230 * (index + 1), friction: 140 };
        }}
      ></AnimatedNumbers>
      <div>
        <button onClick={() => setNum((state) => state + 31234)}>+</button>
        <button onClick={() => setNum((state) => state - 31234)}>-</button>
      </div>
    </div>
  );
}

export default App;
```

## Todo

- [ ] test code
- [x] start animation when dom is visible
