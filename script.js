"use strict";

const container = document.querySelector(".container");
const button = document.querySelector(".button");
const buttonClear = document.querySelector(".clear");

const gridInputRange = document.querySelector(".grid-input-range");
const gridInputNumber = document.querySelector(".grid-input-number");
const gridInput = document.querySelector(".grid-number");

const colorPickBox = document.querySelector("#color");
const colorPickBackground = document.querySelector("#color-background");
const colorChange = document.querySelectorAll(".color-change");

const stylesheet = document.styleSheets[1];
const containerBackgroundColor = [...stylesheet.cssRules].find(
	(r) => r.selectorText === ".box"
);
const boxBackgroundColor = [...stylesheet.cssRules].find(
	(r) => r.selectorText === ".color-change"
);

const colorReset = document.querySelector(".color-reset");
const btnRandom = document.querySelector(".btn-random");
const btnAdd = document.querySelector(".btn-add");

const squareGrid = function (grid) {
	//Create column
	for (let i = 1; i <= grid; i++) {
		container.insertAdjacentHTML(
			"afterbegin",
			"<div class='column-container'></div>"
		);
		for (let i = 1; i <= grid; i++) {
			document
				.querySelector(".column-container")
				.insertAdjacentHTML("afterbegin", "<div class='box'></div>");
		}
	}

	const box = document.querySelectorAll(".box");
	box.forEach((e) =>
		e.addEventListener("mouseenter", function (e) {
			e.target.classList.add("color-change");
		})
	);
};

squareGrid(30);

gridInput.addEventListener("change", function () {
	container.textContent = "";
	squareGrid(gridInputRange.value);
});

gridInput.addEventListener("change", function () {
	container.textContent = "";
	squareGrid(gridInputNumber.value);
});
// for (let i = 10; i <= 100; i += 10) {
// 	document
// 		.querySelector("#tickmarks")
// 		.insertAdjacentHTML(
// 			"beforeend",
// 			`<option value="${i}" label="${i}"></option>`
// 		);
// }

// button.addEventListener("click", function (e) {
// 	let answer = Number(prompt(`Grid Size /n X by X squares`));
// 	container.textContent = "";
// 	squareGrid(answer);
const box = document.querySelectorAll(".box");
// });

//Reset to default grid
buttonClear.addEventListener("click", function () {
	const box = document.querySelectorAll(".box");
	box.forEach((box) => {
		box.style.backgroundColor = `${containerBackgroundColor.style.backgroundColor}`;
		box.style.backgroundColor = "";
		box.classList.remove("color-change");
	});
});

colorPickBox.addEventListener("input", function () {
	boxBackgroundColor.style.setProperty(
		"background-color",
		`${colorPickBox.value}`
	);
});

colorPickBackground.addEventListener("input", function () {
	containerBackgroundColor.style.setProperty(
		"background-color",
		`${colorPickBackground.value}`
	);
});

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

let state = true;

btnRandom.addEventListener("click", function (e) {
	const box = document.querySelectorAll(".box");
	if (state) {
		box.forEach((box) =>
			box.addEventListener("mouseenter", function (e) {
				this.style.backgroundColor = randomRGB();
			})
		);
		state = false;
	} else {
		box.forEach((e) =>
			e.addEventListener("mouseenter", function (e) {
				this.style.backgroundColor = "";
			})
		);
		state = true;
	}
});

let toggle = true;
btnAdd.addEventListener("click", function () {
	const box = document.querySelectorAll(".box");
	if (toggle) {
		box.forEach((box) => {
			let i = 0.1;

			box.addEventListener("mouseenter", function (e) {
				this.style.backgroundColor = `rgb(0,0,0, ${i})`;
				i += 0.1;
				buttonClear.addEventListener("click", function () {
					i = 0.1;
				});
			});
		});
		toggle = false;
	} else {
		box.forEach((e) =>
			e.addEventListener("mouseenter", function (e) {
				this.style.backgroundColor = "";
			})
		);
		toggle = true;
	}
});
