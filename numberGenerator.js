const { levels } = require("./gameSettings");

/*
let x = random();
let y = random();

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
let level = "veryHard";
let firstValue = randomInteger(levels[level].min, levels[level].max);
let secondValue = randomInteger(firstValue, levels[level].max) + 20;

module.exports = {
	firstValue,
	secondValue,
};
*/

// let options = [5, 7, 17, 8, 98, 12];

let arr = [];

function randomInteger(min, max) {
	return arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
}

// let level = "veryHard";
for (let i = 0, t = 3; i < t; i++) {
	randomInteger(1, 10);
}

console.log(arr);
