const { levels } = require("./gameSettings");

//random number generator
let generateNumbers;
generateNumbers = (min, max) => {
	/*let min = this.gameLevel.min;
	let max = this.gameLevel.max;*/
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// generate two random number

let valueA = generateNumbers(levels.easy.min, levels.easy.max);
let valueB = generateNumbers(valueA, levels.easy.max);

let answer = valueA + valueB;
let arraySize = 5;
//generate array of random options
let options = Array.from(
	{ length: arraySize },
	() =>
		Math.floor(Math.random() * (levels.veryHard.max - levels.veryHard.min)) +
		levels.easy.min,
);

const shuffleArray = () => {
	return Math.floor(Math.random() * arraySize);
};

options.splice(shuffleArray(), 0, answer);

console.log(`Value A:${valueB}, value B: ${valueA}`);
console.log(`Answer:${answer}`);

console.log(`Answer options: ${options}`);
console.log(`shuffler ${shuffleArray()}`);
