import React from "react"
import AnimatedNumbers from "react-animated-numbers"
import "./App.css"

function App() {
	return (
		<div className="container">
			<AnimatedNumbers
				animateToNumber={4224040}
        fontStyle={{ fontSize: 40 }}
        delay={400}
				onStart={() => console.log("onStart")}
				onFinish={() => {
					console.log("onFinish")
				}}
			></AnimatedNumbers>
		</div>
	)
}

export default App
