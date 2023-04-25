const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.querySelector("#color-picker");
const sizeSlider = document.querySelector("#size-slider");
const sizeDiv = document.querySelector("#size");
const clearButton = document.querySelector("#clear-button");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set the initial size display
sizeDiv.textContent = sizeSlider.value;

// Store the state of the canvas for undo/redo
const states = [];
let currentState = -1;

function saveState() {
  currentState++;
  if (currentState < states.length) {
    states.splice(currentState);
  }
  states.push(canvas.toDataURL());
}

function undo() {
  if (currentState > 0) {
    currentState--;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = states[currentState];
  }
}

function redo() {
  if (currentState < states.length - 1) {
    currentState++;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = states[currentState];
  }
}

function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = colorPicker.value;
  ctx.lineWidth = sizeSlider.value;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  saveState();
});
canvas.addEventListener("mouseout", () => (isDrawing = false));

sizeSlider.addEventListener("input", () => {
  sizeDiv.textContent = sizeSlider.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  saveState();
});

// Add undo/redo event listeners
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "z") {
    e.preventDefault();
    undo();
  } else if (e.ctrlKey && e.key === "y") {
    e.preventDefault();
    redo();
  }
});
