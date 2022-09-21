import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import "./App.css";

function App() {
const canvasRef = useRef(null);
const ctxRef = useRef(null);
const [tab, setTab] = useState([[],[]]);
const [isDrawing, setIsDrawing] = useState(false);

// Initialization when the component
// mounts for the first time
useEffect(() => {
	const canvas = canvasRef.current;
	
	const ctx = canvas.getContext("2d");
	ctxRef.current = ctx;
}, []);

// Function for starting the drawing
const startDrawing = (e) => {	
	ctxRef.current.beginPath();
	ctxRef.current.moveTo(
	e.nativeEvent.offsetX,
	e.nativeEvent.offsetY
	);
	setIsDrawing(true);

};

// Function for ending the drawing
const endDrawing = () => {
	ctxRef.current.closePath();
	setIsDrawing(false);	
	let minX = Math.min(...tab[0]);
	let maxX = Math.max(...tab[0]);
	let minY = Math.min(...tab[1]);
	let maxY = Math.max(...tab[1]);
	ctxRef.current.rect(minX,minY,maxX-minX,maxY-minY);
	ctxRef.current.stroke();
	setTab([[],[]]);
};

const draw = (e) => {
	if (!isDrawing) {
	return;
  }	ctxRef.current.lineTo(
	e.nativeEvent.offsetX,
	e.nativeEvent.offsetY
	);
	
	tab[[0]].push(e.nativeEvent.offsetX);
	tab[[1]].push(e.nativeEvent.offsetY);
	
	ctxRef.current.stroke();
	
};

return (
	<div className="App">
	<h1>Paint App</h1>
	<div className="draw-area">
		<canvas
		onMouseDown={startDrawing}
		onMouseUp={endDrawing}
		onMouseMove={draw}
		ref={canvasRef}
		width={`500px`}
		height={`500px`}
		/>

		
	</div>
	</div>
);
}

export default App;
