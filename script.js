"use strict";

const container = document.querySelector(".container");

const squareGrid = function (x, y) {
	//Create column
	for (let i = 1; i <= x; i++) {
		container.insertAdjacentHTML(
			"afterbegin",
			"<div class='column-container'></div>"
		);
		for (let i = 1; i <= y; i++) {
			document
				.querySelector(".column-container")
				.insertAdjacentHTML("afterbegin", "<div class='column-box'></div>");
		}
	}
};

squareGrid(5, 6);
