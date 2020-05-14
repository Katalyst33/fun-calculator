const easyGameLevel = {
	arithmeticOperator: ["+"],
	score: 10,
	min: 1,
	max: 20,
	options: 2,
	refresh: 3,
};
const mediumGameLevel = {
	arithmeticOperator: ["-", "+"],
	score: 15,
	min: 10,
	max: 20,
	options: 3,
	refresh: 5,
};
const hardGameLevel = {
	arithmeticOperator: ["-", "+", "*"],
	score: 20,
	min: 10,
	max: 50,
	options: 4,
	refresh: 5,
};
const veryHardGameLevel = {
	arithmeticOperator: ["-", "+", "*", "/"],
	score: 25,
	min: 1,
	max: 50,
	options: 5,
	refresh: 3,
};

const levels = {
	easy: easyGameLevel,
	medium: mediumGameLevel,
	hard: hardGameLevel,
	veryHard: veryHardGameLevel,
	options: 3,

	refresh: 3,
};

module.exports = {
	levels,
};
