"use strict";

const container = document.querySelector(".container");

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
};

squareGrid(50);

const box = document.querySelectorAll(".box");

box.forEach((e) =>
	e.addEventListener("mouseenter", function (e) {
		e.target.classList.add("color-change");
	})
);
