<a href="https://www.npmjs.com/package/react-animated-numbers">
<img alt="npm version" src="http://img.shields.io/npm/v/react-animated-numbers.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/react-animated-numbers">
<img src="http://img.shields.io/npm/dm/react-animated-numbers.svg?style=flat-square">
</a>

# react-animated-numbers

Library showing animation of number changes in react.js

### Test

[Homepage](https://optimistic-noyce-cf2473.netlify.app/)

### Props

|      name       |         type         |    default     | description                                                                                                                                                                                                                                                                                               |
| :-------------: | :------------------: | :------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animateToNumber |        number        |      none      | Number to be animated                                                                                                                                                                                                                                                                                     |
|    fontStyle    | React.CSSProperties? |      none      | Style of number text                                                                                                                                                                                                                                                                                      |
|  includeComma   |       boolean?       |     false      | Whether the number contains commas                                                                                                                                                                                                                                                                        |
|     onStart     |      (): void?       |   undefined    | Function executed when animation is started                                                                                                                                                                                                                                                               |
|    onFinish     |      (): void?       |   undefined    | Function executed when animation is finished                                                                                                                                                                                                                       |
|     configs     |   SpringConfig[]?    | config.default | This module is using [react-spring](https://www.react-spring.io) and you can refer to this [config option](https://react-spring.io/common/configs). If you pass multiple settings, an animation is randomly assigned to each number. _ DO NOT USE `duration` because of a bug that hasn't been fixed yet_ |

### Custom Style
 - you can use className `animated-container` to style container ([example](https://github.com/heyman333/react-animated-numbers/blob/master/example/src/App.css))
 - if you want to customize font style. Just ues `fontStyle` prop

### Example

```js
import React from "react";
import AnimatedNumbers from "./module";
import "./App.css";

function App() {
  const [num, setNum] = React.useState(331231);
  return (
    <div className="container">
      <AnimatedNumbers
        includeComma
        animateToNumber={num}
        fontStyle={{ fontSize: 40 }}
        onStart={() => console.log("onStart")}
        onFinish={() => {
          console.log("onFinish!");
        }}
        configs={[
          { mass: 1, tension: 220, friction: 100 },
          { mass: 1, tension: 180, friction: 130 },
          { mass: 1, tension: 280, friction: 90 },
          { mass: 1, tension: 180, friction: 135 },
          { mass: 1, tension: 260, friction: 100 },
          { mass: 1, tension: 210, friction: 180 },
        ]}
      ></AnimatedNumbers>
      <div>
        <button onClick={() => setNum((state) => state + 31234)}>+</button>
        <button onClick={() => setNum((state) => state - 31234)}>-</button>
      </div>
    </div>
  );
}

export default App;

}
```
