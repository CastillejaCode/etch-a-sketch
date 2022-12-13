"use strict";

const sketchContainer = document.querySelector(".sketch-container");
const colorChange = document.querySelectorAll(".color-change");

const gridInput = document.querySelector(".grid-number");
const gridInputRange = document.querySelector(".grid-input-range");
const gridInputNumber = document.querySelector(".grid-input-number");

const colorPickBox = document.querySelector("#color");
const colorPickBackground = document.querySelector("#color-background");
const colorReset = document.querySelector(".color-reset");

const stylesheet = document.styleSheets[1];
const containerBackgroundColor = [...stylesheet.cssRules].find(
	(r) => r.selectorText === ".box"
);
const boxBackgroundColor = [...stylesheet.cssRules].find(
	(r) => r.selectorText === ".color-change"
);

const btnRandom = document.querySelector(".btn-random");
const btnAdd = document.querySelector(".btn-add");
const btnClear = document.querySelector(".clear");

//Create Grid
const squareGrid = function (grid) {
	//Create column
	for (let i = 1; i <= grid; i++) {
		sketchContainer.insertAdjacentHTML(
			"afterbegin",
			"<div class='column-container'></div>"
		);
		//Create Rows
		for (let i = 1; i <= grid; i++) {
			document
				.querySelector(".column-container")
				.insertAdjacentHTML("afterbegin", "<div class='box'></div>");
		}
	}
	//Add Color Change
	const box = document.querySelectorAll(".box");
	box.forEach((e) =>
		e.addEventListener("mouseenter", function (e) {
			e.target.classList.add("color-change");
		})
	);
};

//Default grid state
squareGrid(30);

//Change grid size
gridInput.addEventListener("change", function () {
	sketchContainer.textContent = "";
	squareGrid(gridInputRange.value);
	sketchContainer.textContent = "";
	squareGrid(gridInputNumber.value);
});

//Clear Grid
btnClear.addEventListener("click", function () {
	const box = document.querySelectorAll(".box");

	box.forEach((box) => {
		box.style.backgroundColor = `${containerBackgroundColor.style.backgroundColor}`;
		box.style.backgroundColor = "";
		box.classList.remove("color-change");
	});
});

//Change marker color
colorPickBox.addEventListener("input", function () {
	boxBackgroundColor.style.setProperty(
		"background-color",
		`${colorPickBox.value}`
	);
});

//Change background color
colorPickBackground.addEventListener("input", function () {
	containerBackgroundColor.style.setProperty(
		"background-color",
		`${colorPickBackground.value}`
	);
});

//Back to default colors
colorReset.addEventListener("click", function () {
	boxBackgroundColor.style.setProperty("background-color", `black`);
	containerBackgroundColor.style.setProperty("background-color", `white`);
	colorPickBox.value = "#000000";
	colorPickBackground.value = "#FFFFFF";
});

//Random Color on Each Pass Through
const randomRGB = function () {
	const random = function () {
		return Math.floor(Math.random() * 256);
	};
	const rgb = `rgb(${random()}, ${random()}, ${random()})`;
	return rgb;
};

//Random colors
let stateRandom = true;
btnRandom.addEventListener("click", function (e) {
	const box = document.querySelectorAll(".box");
	if (stateRandom) {
		//Stops both buttons from being active
		if (btnAdd.classList.contains("button-active")) return;

		btnRandom.classList.toggle("button-active");
		box.forEach((box) =>
			box.addEventListener("mouseenter", function (e) {
				this.style.backgroundColor = randomRGB();
			})
		);
		stateRandom = false;
	} else {
		btnRandom.classList.toggle("button-active");
		box.forEach((e) =>
			e.addEventListener("mouseenter", function (e) {
				this.style.backgroundColor = "";
			})
		);
		stateRandom = true;
	}
});

//Additive color, transparent blocks
let stateAdditive = true;
btnAdd.addEventListener("click", function () {
	const box = document.querySelectorAll(".box");
	if (stateAdditive) {
		//Stops both buttons from being active
		if (btnRandom.classList.contains("button-active")) return;

		btnAdd.classList.toggle("button-active");
		box.forEach((box) => {
			let i = 0.1;
			box.addEventListener("mouseenter", function (e) {
				this.style.backgroundColor = `rgb(0,0,0, ${i})`;
				i += 0.1;

				//Resets first level of transparency on clear
				btnClear.addEventListener("click", function () {
					i = 0.1;
				});
			});
		});
		stateAdditive = false;
	} else {
		btnAdd.classList.toggle("button-active");
		box.forEach((e) =>
			e.addEventListener("mouseenter", function (e) {
				this.style.backgroundColor = "";
			})
		);
		stateAdditive = true;
	}
});
