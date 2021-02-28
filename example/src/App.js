import React from "react"
import AnimatedNumbers from "./module"
import "./App.css"

function App() {
  const [num, setNum] = React.useState(331231)
  return (
    <div className="container">
      <AnimatedNumbers
        includeComma
        animateToNumber={num}
        fontStyle={{ fontSize: 40 }}
        config={{ duration: 600 }}
        onStart={() => console.log("onStart")}
        onFinish={() => {
          console.log("onFinish!")
        }}
        animationType={"calm"}
      ></AnimatedNumbers>
      <div>
        <button onClick={() => setNum((state) => state + 31234)}>+</button>
        <button onClick={() => setNum((state) => state - 31234)}>-</button>
      </div>
    </div>
  )
}

export default App
