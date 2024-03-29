const grid = document.querySelector('.grid');
const resetBtn = document.getElementById('resetBtn');
const eraserBtn = document.getElementById('eraserBtn');
const blackBtn = document.getElementById('blackBtn');
const colorBtn = document.getElementById('colorBtn')
const colorValue = document.getElementById('color');
const slider = document.getElementById('slider');
const sliderValue = document.querySelector('.value');
const DEFAULT_COLOR = '#000000';
const DEFAULT_MODE = 'black';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let mouseDown = false

document.body.addEventListener("mousedown", () => (mouseDown = true))
document.body.addEventListener("mouseup", () => (mouseDown = false))

function setCurrentColor(newColor) {
	currentColor = newColor;
}

function setCurrentMode(newMode) {
	activateButton(newMode);
	currentMode = newMode;
}

blackBtn.onclick = () => setCurrentMode('black');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
colorBtn.onclick = () => setCurrentMode('color');
resetBtn.onclick = () => createGrid();

function createGrid() {
	removeCells(grid);
	let val = document.getElementById('slider').value;
	sliderValue.textContent = val;
	grid.style.gridTemplateColumns = (`repeat(${val}, 1fr`);
	grid.style.gridTemplateRows = (`repeat(${val}, 1fr`);
	for(let i = 0; i < val * val; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.addEventListener('mouseover', changeColor);
		cell.addEventListener('mousedown', changeColor);
		grid.appendChild(cell);
	}
}

function activateButton(newMode) {
	if (currentMode === 'rainbow') {
		rainbowBtn.classList.remove('active');
	} else if (currentMode === 'color') {
		colorBtn.classList.remove('active');
	} else if (currentMode === 'eraser') {
		eraserBtn.classList.remove('active');
	} else if (currentMode === 'black') {
		blackBtn.classList.remove('active');
	}

	if (newMode === 'rainbow') {
		rainbowBtn.classList.add('active');
	} else if (newMode === 'color') {
		colorBtn.classList.add('active');
	} else if (newMode === 'eraser') {
		eraserBtn.classList.add('active');
	} else if (newMode === 'black') {
		blackBtn.classList.add('active');
	}
}

function changeColor(e) {
	if (e.type === 'mouseover' && !mouseDown) return;
	if (currentMode === 'rainbow') {
		const randomR = Math.floor(Math.random() * 256);
		const randomG = Math.floor(Math.random() * 256);
		const randomB = Math.floor(Math.random() * 256);
		e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
	} else if (currentMode === 'color') {
		e.target.style.backgroundColor = colorValue.value;
	} else if (currentMode === 'eraser') {
		e.target.style.backgroundColor = '#ffffff';
	} else if (currentMode === 'black') {
		e.target.style.background = '#000000';
	}
}

slider.addEventListener('input', function(e) {
  let val = parseInt(document.getElementById('slider').value);
  createGrid(val);
});

function removeCells(parent){
	while(grid.firstChild){
		grid.removeChild(grid.firstChild);
	}
}

window.onload = () => {
	createGrid(DEFAULT_SIZE);
	activateButton(DEFAULT_MODE);
}