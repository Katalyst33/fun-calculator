const easyGameLevel = {
	arithmeticOperator: ["+"],
	score: 10,
	min: 1,
	max: 20,
	options: 3,
};
const mediumGameLevel = {
	arithmeticOperator: ["-", "+"],
	score: 15,
	min: 10,
	max: 20,
	options: 3,
};
const hardGameLevel = {
	arithmeticOperator: ["-", "+", "*"],
	score: 20,
	min: 10,
	max: 50,
	options: 3,
};
const veryHardGameLevel = {
	arithmeticOperator: ["-", "+", "*", "/"],
	score: 25,
	min: 1,
	max: 50,
	options: 3,
};

const levels = {
	easy: easyGameLevel,
	medium: mediumGameLevel,
	hard: hardGameLevel,
	veryHard: veryHardGameLevel,
};

module.exports = {
	levels,
};
