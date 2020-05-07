<template>
    <div>
        <div>
            <h1 class="is-size-1 has-text-weight-bold has-text-white">
                Calculator Game
            </h1>


            <section class="container mx-5 px-5 py-5">
                <div class="area">
                    <div class="box-1 px-4  has-background-warning">
                        <h1 class="is-size-1 has-text-danger ">{{valueA}}</h1>
                    </div>
                    <div class="box-2 px-4  ">
                        <h1 id="operator" class="is-size-1 has-text-weight-bold has-text-white ">{{operator}}</h1>


                    </div>
                    <div class="box-3 px-4  has-background-warning">
                        <h1 class="is-size-1 has-text-danger">{{valueB}}</h1>

                    </div>
                    <div class="box-4">
                        <h1 class="is-size-1 has-text-white">=</h1>

                    </div>
                    <div class="box-5">

                        <input @keyup.enter="checkAnswer" @input="submitButtonState" v-model="userAnswer"
                               class="input is-large has-background-warning" type="number">


                    </div>
                </div>

                <div class="py-5">

                    <div>
                        <button @click="refresh" class="button is-success">Refresh</button>

                        <div class="select mx-5">
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
                        <button :disabled="buttonState.submit" @click="checkAnswer" class="button is-warning">submit
                        </button>
                    </div>
                    <h1 class="has-text-success is-size-1 pt-5">Score:50</h1>
                </div>
            </section>

        </div>

        <div id="debug" class=" has-text-white has-text-weight-bold">
            <div class="has-background-danger"><h1 class="has-text-left is-size-3">Debugger</h1></div>
            <ul class="is-size-4 has-text-left">
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
                difficultyLevel: "mathematician",
                userScore: 10,
                answerSpeed: 5,
                buttonState: {
                    submit: false,
                    answer: true,
                },
                operator: "???",
                operators: ['-', '+', '*',],
                operation: null,
                message: {
                    correct: "hurray !! you are a genius !",
                    wrong: "ooooooh, keep practising"
                }
            }
        },

        created: function () {
            this.getRandomNumber()
            this.randomiseOperator()
            this.submitButtonState()
        },

        methods: {

            refresh() {
                this.getRandomNumber()
                this.randomiseOperator()
                this.equals()

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
                } else {
                    this.buttonState.submit = false

                }

            },

            checkAnswer() {
                this.equals();
                if (this.answer === this.userAnswer) {
                    // this.$swal(`your answer ${this.userAnswer} is correct`)
                    this.$swal.fire({
                        title: 'Correct !',
                        text: this.message.correct,
                        imageUrl: '/img/face/albert.png',
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                    })
                    console.log(`correct Answer: ${typeof (this.answer)} user Answer${typeof (this.userAnswer)}`)

                    this.userAnswer = null
                    this.answer = null
                } else {
                    this.buttonState.answer = false
                    // this.$swal(`lair !! \n correct answer is ${this.answer}`)
                    this.$swal.fire({
                        title: `Wrong!! \n correct answer is ${this.answer}`,
                        text: this.message.wrong,
                        imageUrl: '/img/face/hawk.png',
                        imageWidth: 300,
                        imageHeight: 300,
                        imageAlt: 'Custom image',
                    })
                    console.log(`correct Answer: ${typeof (this.answer)} user Answer${typeof (this.userAnswer)}`)


                    this.userAnswer = null
                    this.answer = null

                }
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

                this.answer =  `${Math.round(parseFloat(calculation))}`

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
        border: #090808 solid medium;
        background-image: url("/img/yellow-button.png");
    }

    .box-3 {
        border: #090808 solid medium;
        background-image: url("/img/yellow-button.png");


    }

    #debug {
        border: #fa088c 1px solid;
        width: 50%;
        margin: 0 auto;
    }

    li {
        padding: 10px 10px 10px;
    }

</style>
