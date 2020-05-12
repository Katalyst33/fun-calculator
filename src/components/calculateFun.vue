<template>
    <div id="game">
        <div>

            <div class="columns">
                <div class="column is-three-fifths is-offset-one-fifth ">
                    <div class="columns is-mobile">
                        <div class="column ">
                            <h1 class="values has-text-light ">{{valueB}}</h1>
                        </div>
                        <div class="column">
                            <h1 id="operator" class="values has-text-weight-bold has-text-warning box-2 ">
                                {{operator}}
                            </h1>
                        </div>
                        <div class="column">
                            <h1 class="values has-text-light ">{{valueA}}</h1>
                        </div>
                    </div>
                </div>

            </div>

            <div class="columns">
                <div class="column is-three-fifths is-offset-one-fifth">

                    <div>
                        <input @keyup.enter="checkAnswer" v-model="userAnswer"
                               class="input is-large has-background-warning" type="number">
                        <p class="has-text-white">Type Answer</p>

                    </div>
                    <div id="answer" class=" field is-grouped mt-5">
                        <div v-for="(answerOption, index) in answerOptions" :key="index" class="control">
                            <h1 class="is-size-1 has-text-danger answer-button px-5"> {{answerOption}}</h1>
                        </div>
                    </div>
                </div>

            </div>

            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">

                    <div class="py-5">
                        <button :disabled="disableButton" @click="checkAnswer" class="button is-success is-large">
                            Submit Answer
                        </button>
                    </div>

                    <div class="select is-medium mmb-4 my-md-0">
                        <select

                                v-model="difficultyLevel">
                            <option disabled value="">Select Difficulty
                            </option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                            <option value="mathematician">Mathematician</option>
                        </select>
                    </div>

                    <div class="mt-5">
                        <button @click="refreshGameValues"
                                class="button is-white has-text-success mb-4 mb-md-0 is-large">
                            Refresh<i class="fad fa-lightbulb-on"></i></button>
                    </div>
                    <router-link to="/settings" class="button is-danger my-3"> Settings</router-link>

                    <div>
                        <h1 class="has-text-success has-text-centered is-size-1 pt-5">Score:{{userScore}}</h1>
                        <h1 class="has-text-warning has-text-centered is-size-1 pt-5">Refresh:{{userScore}}</h1>
                    </div>

                </div>
            </div>
        </div>

        <div id="debug" class=" has-text-white has-text-weight-bold">
            <div class="has-background-danger"><h1 class="has-text-left is-size-4">Debugger</h1></div>
            <ul class="is-size-5 has-text-left">
                <li>
                    <button @click="calculateAnswer" class="button is-primary mx-4">Get answer</button>
                </li>
                <li>Correct Answer:{{answer}}</li>
                <li>User Answer:{{userAnswer}}</li>
                <li>Score:{{userScore}}</li>
                <li>Duration: {{answerSpeed}}Secs</li>
                <li>Difficulty: <span class="is-capitalized">{{difficultyLevel}}</span></li>

            </ul>

            <template>
                <vue-countdown-timer
                        @start_callback="startCallBack('event started')"
                        @end_callback="endCallBack('event ended')"
                        :start-time="'2018-10-10 00:00:00'"
                        :end-time="1481450115"
                        :interval="1000"
                        :start-label="'Until start:'"
                        :end-label="'Until end:'"
                        label-position="begin"
                        :end-text="'Event ended!'"
                        :day-txt="'days'"
                        :hour-txt="'hours'"
                        :minutes-txt="'minutes'"
                        :seconds-txt="'seconds'">
                </vue-countdown-timer>
            </template>
        </div>

    </div>
</template>

<script>
	// import { firstValue, secondValue } from "../../numberGenerator";
	import { levels } from "../../gameController";


	export default {
		data() {
			return {
				valueA: null,
				valueB: null,
				answer: null,
				answerOptions: [
					2, 4, 6, 8,
				],
				userAnswer: null,
				difficultyLevel: "easy",
				operator: null,
				userScore: 0,
				answerSpeed: 5,
				disableButton: true,
				message: {
					correct: "hurray !! you are a genius !",
					wrong: "ooooooh, keep practising",
				},
			};
		},
// watch: watches data for changes
		watch: {
			difficultyLevel() {
				this.onLevelChange();
			},

			userAnswer() {
				this.submitButtonState();
			},
		},

		computed: {
			userAnswerToNumber() {
				return Number(this.userAnswer);
			},

			x() {
				return Number(this.valueB);
			},
			y() {
				return Number(this.valueA);

			},
			gameLevel() {
				const level = this.difficultyLevel;
				if (level === "medium") {
					return levels.medium;
				} else if (level === "hard") {
					return levels.hard;
				} else if (level === "mathematician") {
					return levels.veryHard;
				} else {
					return levels.easy;
				}
			},
		},
		created() {
			this.getRandomNumber();
			this.randomiseArithmeticOperator();
		},

		mounted() {
			this.refreshGameValues();
		},
		methods: {
			startCallBack: function(x) {
				console.log(x);
			},
			endCallBack: function(x) {
				console.log(x);
			},


			submitButtonState() {
				this.disableButton = this.userAnswer === null;
			},
			refreshGameValues() {
				this.onLevelChange();
			},
			calculateAnswer() {
				if (this.operator === "*") {
					this.answer = this.multiplication();
				} else if (this.operator === "/") {
					this.answer = this.division();
				} else if (this.operator === "+") {
					this.answer = this.addition();
				} else if (this.operator === "-") {
					this.answer = this.subtraction();
				}
			},
			checkAnswer() {
				this.calculateAnswer();


				if (this.answer === this.userAnswerToNumber) {
					this.$swal.fire({
						title: "Correct !",
						text: this.message.correct,
						imageUrl: "/img/face/albert.png",
						imageWidth: 300,
						imageHeight: 300,
						imageAlt: "Custom image",
					}).then(this.onWin);

				} else {
					this.$swal.fire({
						title: `Wrong!! \n ${this.valueA} ${this.operator} ${this.valueB} is ${this.answer}`,
						text: this.message.wrong,
						imageUrl: "/img/face/hawk.png",
						imageWidth: 300,
						imageHeight: 300,
						imageAlt: "Custom image",
					}).then(this.refreshGameValues);
				}
			},
			onWin() {
				this.setScorePoints();
				this.refreshGameValues();
			},
			multiplication() {
				return this.x * this.y;
			},
			subtraction() {
				return this.x - this.y;
			},
			addition() {
				return this.x + this.y;
			},
			division() {
				return this.x / this.y;
			},
			setScorePoints() {
				let scorePoint = this.gameLevel.score;
				this.userScore += scorePoint;
			},
			generateNumber(min, max) {
				/*let min = this.gameLevel.min;
				let max = this.gameLevel.max;*/
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			getRandomNumber() {
				this.valueA = this.generateNumber(this.gameLevel.min, this.gameLevel.max);
				this.valueB = this.generateNumber(this.valueA, this.gameLevel.max) + 20;
			},
			randomiseArithmeticOperator() {
				this.operators = this.gameLevel.arithmeticOperator;
				let selector = Math.floor(Math.random() * this.operators.length);
				this.operator = this.operators[selector];
			},
			onLevelChange() {
				this.answer = null;
				this.userAnswer = null;
				this.randomiseArithmeticOperator();
				this.getRandomNumber();
			},

          buttonAnswer(){
				alert('value')
          }
		},

	};
</script>

<style scoped>

    #game {
        font-family: 'Balsamiq Sans', cursive;

    }


    .is-size-1 {
        /*font-family: 'Balsamiq Sans', cursive;*/
    }

    .area {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .input {
        width: 35%;
    }

    #operator {
        font-size: 80px;
    }

    #answer {
        width: auto;
        margin: 0 auto;

    }


    .answer-button {
        /*border: #090808 solid medium;*/
        background-image: url("/img/yellow-button.png");
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
    }
    .answer-button:hover {
        /*padding: 2px 2px 2px 2px;*/
        /*background-color: #00aa91;*/
        filter:brightness(80%);
    }

    #debug {
        border: #fa088c 1px solid;
        width: 80%;
        margin: 0 auto;
    }

    li {
        padding: 10px 10px 10px;
    }

    .values {
        font-size: 550%;
    }

</style>
