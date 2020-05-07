<template>
    <div>
        <div>
            <div class="columns">
                <div class="column">
                    <div class="columns is-mobile">
                        <div class="column ">
                            <h1 class="is-size-1 has-text-danger box-1 ">{{valueA}}</h1>

                        </div>
                        <div class="column">
                            <h1 id="operator" class="is-size-1 has-text-weight-bold has-text-white box-2 ">
                                {{operator}}</h1>

                        </div>
                        <div class="column">
                            <h1 class="is-size-1 has-text-danger box-3">{{valueB}}</h1>

                        </div>
                    </div>
                </div>
                <div class="column box-5">
                    <div>
                        <div class="box-4">
                            <input @keyup.enter="checkAnswer" @input="submitButtonState" v-model="userAnswer"
                                   class="input is-large has-background-warning" type="number">
                            <p class="has-text-white">Answer</p>

                        </div>


                    </div>
                </div>
            </div>

            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">

                    <div class="py-5">
                        <button :disabled="buttonState.submit" @click="checkAnswer" class="button is-success is-large">
                            Submit Answer
                        </button>
                    </div>

                    <div class="select is-medium mmb-4 my-md-0">
                        <select
                                @change="selectOperator"
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
                        <button @click="refresh" class="button is-white has-text-success mb-4 mb-md-0 is-large">
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
                    <button @click="equals" class="button is-dark mx-4">Get answer</button>
                </li>


            </ul>

        </div>

    </div>
</template>

<script>
    import {easyOperator, hardOperator, mediumOperator, veryHardOperator} from "../../gameController"

    export default {
        data() {
            return {
                valueA: null,
                valueB: null,
                answer: null,
                userAnswer: "",
                difficultyLevel: "easy",
                userScore: 0,
                answerSpeed: 5,
                buttonState: {
                    submit: false,
                    answer: true,
                },
                message: {
                    correct: "hurray !! you are a genius !",
                    wrong: "ooooooh, keep practising"
                },
            }
        },

        created() {
            this.getRandomNumber()
            this.randomiseOperator()
            this.submitButtonState()
        },

        mounted() {
            this.equals()
            this.refresh()
        },

        methods: {

            refresh() {
                this.equals()
                this.submitButtonState()
                this.answer = null
                this.userAnswer = null
                this.getRandomNumber()
                this.randomiseOperator()
            },

            selectOperator() {
                if (this.operator === '*') {
                    this.times()
                }

                if (this.operator === '/') {
                    this.divide()
                }

                if (this.operator === '+') {
                    this.add()
                }

                if (this.operator === '-') {
                    this.minus()
                }
            },

            submitButtonState() {
                if (this.userAnswer === "") {
                    this.buttonState.submit = true
                }
                if (this.difficultyLevel === "") {
                    this.buttonState.submit = true

                } else {
                    this.buttonState.submit = false
                }

            },

            checkAnswer() {
                this.equals();
                if (this.answer === this.userAnswer) {
                    this.$swal.fire({
                        title: 'Correct !',
                        text: this.message.correct,
                        imageUrl: '/img/face/albert.png',
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                    })
                    this.userScore += 10;
                    // console.log(`correct Answer: ${typeof (this.answer)} user Answer${typeof (this.userAnswer)}`)

                } else {
                    this.buttonState.answer = false
                    this.$swal.fire({
                        title: `Wrong!! \n ${this.valueA} ${this.operator} ${this.valueB} is ${this.answer}`,
                        text: this.message.wrong,
                        imageUrl: '/img/face/hawk.png',
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                    })
                    // console.log(`correct Answer: ${typeof (this.answer)} user Answer${typeof (this.userAnswer)}`)

                }
                this.refresh()

            },

            times() {
                this.operation = (a, b) => a * b;

            },
            minus() {
                this.operation = (a, b) => a - b;

            },
            add() {
                this.operation = (a, b) => a + b;

            },
            divide() {
                this.operation = (a, b) => a / b;

            },

            equals() {
                let calculation = `${this.operation(parseFloat(this.valueA), parseFloat(this.valueB))}`;

                return this.answer = `${Math.round(parseFloat(calculation))}`
            },

            getRandomNumber() {
                this.valueA = this.generateNumber()
                this.valueB = this.generateNumber()
                this.operator = this.randomiseOperator()
            },

            generateNumber() {
                return Math.floor(Math.random() * (10) + 1);

            },

            randomiseOperator() {

                if (this.difficultyLevel === 'easy') {
                    this.operators = easyOperator
                }
                if (this.difficultyLevel === 'medium') {
                    this.operators = mediumOperator
                }
                if (this.difficultyLevel === 'hard') {
                    this.operators = hardOperator
                }
                if (this.difficultyLevel === 'mathematician') {
                    this.operators = veryHardOperator
                }
                let selector = Math.floor(Math.random() * this.operators.length);
                this.operator = this.operators[selector]
                this.selectOperator()
            }

        }
    }
</script>

<style scoped>
    @font-face {
        font-family: "Harabara Bold";
        src: url("/fonts/ashcanbb_bold.ttf");

    }

    .is-size-1 {
        font-family: "Harabara Bold";
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
