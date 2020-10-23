<a href="https://www.npmjs.com/package/react-animated-numbers">
<img alt="npm version" src="http://img.shields.io/npm/v/react-animated-numbers.svg?style=flat-square">
</a>
<a href="https://www.npmjs.com/package/react-animated-numbers">
<img src="http://img.shields.io/npm/dm/react-animated-numbers.svg?style=flat-square">
</a>



# react-animated-numbers

Library showing animation of number changes in react.js

### Test

[Homepage](https://heyman333.github.io/animated-numbers/)


### Props 

|      name         |    type    |  default | description                            |
|:-----------------:|:----------:|:--------:|----------------------------------------|
|  animateToNumber  |   number   |   none   | Number to be animated                  |
|     fontStyle     | React.CSSProperties?  |   none   | Style of number text        |
|    includeComma   |  boolean?  |   false  | Whether the number contains commas     |
|    delay          |  number(ms)?   |   undefined  | Milliseconds to decide how late to start animation |
|    includeComma   |  boolean?  |   false  | Whether the number contains commas     |
|    onStart   |  (): void?  |   undefined  | Function executed when animation is started     |
|    onFinish   |  (): void?  |   undefined  | Function executed when animation is finished     |
|       config      |   SpringConfig?  |   config.default   | This module is using [react-spring](https://www.react-spring.io) and you can refer to this [config option](https://www.react-spring.io/docs/props/spring)   |


### Example

```js
import React from 'react';
import AnimatedNumber from "react-animated-numbers"

function App() {
  const [number, setNumber] = React.useState(0)
  const [diff, setDiff] = React.useState(0)

  const increaseNumber = () => {
    setNumber(number + diff)
  }

  const decreaseNumber = () => {
    setNumber(number - diff)
  }

  const onChangeValue = (e) => {
    const number = Number(e.target.value)
    setDiff(number)
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <label htmlFor="value">Number Difference</label>
        <input
          id="value"
          title="value"
          placeholder="Difference"
          type="number"
          style={{ marginBottom: 30 }}
          onChange={onChangeValue}
        />
        <AnimatedNumber
          fontStyle={{ fontFamily: "Nunito", fontSize: 40 }}
          animateToNumber={number}
          includeComma
          config={{ tension: 89, friction: 40 }}
        />
        <div
          style={{
            height: 60,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <button onClick={increaseNumber}>increase Number</button>
          <button onClick={decreaseNumber}>decrease Number</button>
        </div>
      </div>
    </div>
  )
}
```



### ScreenShot

<img src="./images/example.gif" alt="example" />