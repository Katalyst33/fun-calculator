<template>
    <div id="game">
        <div>
            <div class="columns">
                <div class="column">
                    <div class="columns is-mobile">
                        <div class="column ">
                            <h1 class="is-size-1 has-text-danger box-1 ">{{valueA}}</h1>
                        </div>
                        <div class="column">
                            <h1 id="operator" class="is-size-1 has-text-weight-bold has-text-white box-2 ">
                                {{operator}}
                            </h1>
                        </div>
                        <div class="column">
                            <h1 class="is-size-1 has-text-danger box-3">{{valueB}}</h1>
                        </div>
                    </div>
                </div>
                <div class="column box-5">
                    <div>
                        <div class="box-4">
                            <input @keyup.enter="checkAnswer" v-model="userAnswer"
                                   class="input is-large has-background-warning" type="number">
                            <p class="has-text-white">Type Answer</p>
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
                <li>Correct Answer:{{answer}}</li>
                <li>User Answer:{{userAnswer}}</li>
                <li>Score:{{userScore}}</li>
                <li>Duration: {{answerSpeed}}Secs</li>
                <li>Difficulty: <span class="is-capitalized">{{difficultyLevel}}</span></li>
                <li>
                    <button @click="calculateAnswer" class="button is-primary mx-4">Get answer</button>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import {easyGameLevel, mediumGameLevel, hardGameLevel, veryHardGameLevel} from "../../gameController"

    export default {
        data() {
            return {
                valueA: null,
                valueB: null,
                answer: null,
                userAnswer: null,
                difficultyLevel: "easy",
                operator: null,
                userScore: 0,
                answerSpeed: 5,
                disableButton: true,
                message: {
                    correct: "hurray !! you are a genius !",
                    wrong: "ooooooh, keep practising"
                },
            }
        },
// watch: watches data for changes
        watch: {
            difficultyLevel() {
                this.onLevelChange()
            },

            userAnswer() {
                this.submitButtonState()
            },
        },

        computed: {


            userAnswerToNumber() {
                return Number(this.userAnswer)
            },

            x() {
                return Number(this.valueA)
            },
            y() {
                return Number(this.valueB)


            },
            gameLevel() {
                const level = this.difficultyLevel;
                if (level === "medium") {
                    return mediumGameLevel
                } else if (level === "hard") {
                    return hardGameLevel
                } else if (level === "mathematician") {
                    return veryHardGameLevel
                } else {
                    return easyGameLevel
                }

            },
        },
        created() {
            this.getRandomNumber()
            this.randomiseArithmeticOperator()
        },

        mounted() {
            this.refreshGameValues()
        },
        methods: {
            submitButtonState() {
                this.disableButton = this.userAnswer === null;
            },

            refreshGameValues() {
                this.onLevelChange()
            },
            calculateAnswer() {
                if (this.operator === '*') {
                    this.answer = this.multiplication()
                } else if (this.operator === '/') {
                    this.answer = this.division()
                } else if (this.operator === '+') {
                    this.answer = this.addition()
                } else if (this.operator === '-') {
                    this.answer = this.subtraction()
                }
            },
            checkAnswer() {
                this.calculateAnswer()


                if (this.answer === this.userAnswerToNumber) {
                    this.$swal.fire({
                        title: 'Correct !',
                        text: this.message.correct,
                        imageUrl: '/img/face/albert.png',
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                    }).then(this.onWin)

                } else {
                    this.$swal.fire({
                        title: `Wrong!! \n ${this.valueA} ${this.operator} ${this.valueB} is ${this.answer}`,
                        text: this.message.wrong,
                        imageUrl: '/img/face/hawk.png',
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                    }).then(this.refreshGameValues)
                }
            },

            onWin() {
                this.setScorePoints()
                this.refreshGameValues()
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

            setScorePoints(){
                let scorePoint =this.gameLevel.score
                this.userScore += scorePoint;
            },
            generateNumber() {
                let min = this.gameLevel.min;
                let max = this.gameLevel.max;
                return Math.floor(Math.random() * (max) + min);
            },

            getRandomNumber() {
                this.valueA = this.generateNumber()
                this.valueB = this.generateNumber()
            },

            randomiseArithmeticOperator() {
                this.operators = this.gameLevel.arithmeticOperator
                let selector = Math.floor(Math.random() * this.operators.length);
                this.operator = this.operators[selector]
            },

            onLevelChange() {
                this.answer = null
                this.userAnswer = null
                this.randomiseArithmeticOperator();
                this.getRandomNumber();
            }
        }

    }
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
        width: 30%;
        margin: 0 auto;

    }


    .box-1 {
        /*border: #090808 solid medium;*/
        background-image: url("/img/yellow-button.png");
        background-repeat: no-repeat;
        background-position: center;


    }

    .box-3 {
        /*border: #090808 solid medium;*/
        background-image: url("/img/yellow-button.png");
        background-repeat: no-repeat;
        background-position: center;


    }

    #debug {
        border: #fa088c 1px solid;
        width: 80%;
        margin: 0 auto;
    }

    li {
        padding: 10px 10px 10px;
    }

</style>
