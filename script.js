"use strict";

const container = document.querySelector(".container");
const button = document.querySelector(".button");
const buttonClear = document.querySelector(".clear");
const gridInputRange = document.querySelector(".grid-input-range");
const gridInputNumber = document.querySelector(".grid-input-number");
const gridInput = document.querySelector(".grid-number");
const colorPick = document.querySelector(".color-pick");

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
// });

buttonClear.addEventListener("click", function () {
	console.log("poop");
	const box = document.querySelectorAll(".box");
	box.forEach((box) => {
		box.classList.remove("color-change");
	});
});

gridInput.addEventListener("change", function () {
	container.textContent = "";
	squareGrid(gridInputRange.value);
});

gridInput.addEventListener("change", function () {
	container.textContent = "";
	squareGrid(gridInputNumber.value);
});
