"use strict";

const container = document.querySelector(".container");
const button = document.querySelector(".button");

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

button.addEventListener("click", function (e) {
	let answer = Number(prompt(`Grid Size /n X by X squares`));
	container.textContent = "";
	squareGrid(answer);
});
