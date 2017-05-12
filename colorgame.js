//Javascript for color game
var allSquares = 6;
var colors = [];
var chosenColor;


var body = document.querySelector("body");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");
var allButtons = document.querySelectorAll('button');

document.querySelector("body").style.background = "url(https://media.giphy.com/media/aRZ4vTsHnyW6A/giphy.gif)";
body.style.backgroundSize="cover";

//Creates random colors 
function randomColor(num) {
	var arr = [];
	var r,g,b, color;
	for (var i = 0; i < num; i++) {
		//pick random number between 0-255
		r = Math.floor(Math.random()*256);
		g = Math.floor(Math.random()*256);
		b = Math.floor(Math.random()*256);

		color = "rgb(" + r + ", " + g + ", " + b + ")";
		arr.push(color);
	};

	return arr;
}
startGame();

function startGame() {
	for (let i=0; i < modeBtns.length; i++) {
		modeBtns[i].addEventListener("click", function() {
			modeBtns[0].classList.remove("selected");
			modeBtns[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? allSquares = 3:allSquares = 6;
			reset();
		});

	}

	for (var i=0; i<squares.length; i++) {
		// add event listeners to squares
		squares[i].addEventListener("click", function() {
			if (this.style.background === chosenColor) {
				message.textContent = "Correct!";
				body.style.background = "url(https://media.giphy.com/media/peAFQfg7Ol6IE/giphy.gif)";
				body.style.backgroundSize = "cover";
				changeColors();
				h1.style.background = "none";
				resetButton.textContent = "Play again?";
				resetButton.removeAttribute("disabled");
				for (var i = 0; i < squares.length; i++) {
					squares[i].classList.remove("glyphicon", "glyphicon-remove", "wrong_square");
				}

			}
			else {

				this.style.background = "none";
				message.textContent = "Try again";
				for (var i = 0; i < allButtons.length; i++) {
					allButtons[i].setAttribute("disabled", "");
				}
				this.classList.add("glyphicon", "glyphicon-remove", "wrong_square");
			}
		});
	}

	resetButton.addEventListener("click", function(){
		reset();
		document.querySelector("body").style.background = "url(https://media.giphy.com/media/aRZ4vTsHnyW6A/giphy.gif)";
		body.style.backgroundSize="cover";
		for (var i = 0; i < allButtons.length; i++) {
			allButtons[i].removeAttribute("disabled");
		}
		for (var j = 0; j < squares.length; j++) {
			squares[j].classList.remove("glyphicon", "glyphicon-remove", "wrong_square");

		}
	});
	reset();
}

function reset() {
	// generate all new colors
	colors = randomColor(allSquares);
	// pick random color from array
	chosenColor = pickColor();
	// update displays
	colorDisplay.textContent = chosenColor;
	message.textContent = "";
	resetButton.textContent = "New Colors";
	// change colors of all squares
	newColors();
	// reset background of h1
	h1.style.background = "none";
}

//reset the color to random colors
function newColors() {
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	};
}

function changeColors() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = chosenColor;
	};
}

function pickColor() {
	var random = Math.floor(Math.random()*colors.length);
	return colors[random];
}
