const { levels } = require("./gameController");

/*let x = random();
let y = random();*/

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
