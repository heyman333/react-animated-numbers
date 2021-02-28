import React from "react"
import AnimatedNumbers from "./module"
import "./App.css"

function App() {
  return (
    <div className="container">
      <AnimatedNumbers
        includeComma
        animateToNumber={492892}
        fontStyle={{ fontSize: 40 }}
        delay={1400}
        onStart={() => console.log("onStart")}
        onFinish={() => {
          console.log("onFinish!")
        }}
        animationType={"calm"}
      ></AnimatedNumbers>
    </div>
  )
}

export default App
