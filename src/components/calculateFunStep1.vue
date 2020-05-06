<template>
    <div>
        <div>
            <h1 class="is-size-3 has-text-weight-bold">
                Calculator Game
            </h1>

            <p id="answer" class="has-background-grey-lighter py-1">Answer:{{answer}} <br>  {{operator}}</p>



            <section class="container mx-5 px-5 py-5">
                <div class="area">
                    <div class="box-1">
                        <h1 class="is-size-1">{{valueA}}</h1>
                    </div>
                    <div class="box-2">
                        <h1 id="operator" class="has-text-weight-bold has-text-danger">{{operator}}</h1>


                    </div>
                    <div class="box-3">
                        <h1 class="is-size-1">{{valueB}}</h1>

                    </div>
                    <div class="box-4">
                        <h1 class="is-size-1">=</h1>

                    </div>
                    <div class="box-5">

                        <input v-model="answer" class="input is-medium" type="number">


                    </div>
                </div>

                <div class="py-5">

                    <div>
                        <button @click="refresh" class="button is-success">Refresh</button>

                        <div class="select mx-5">
                            <select
                                    @change="selectOperator"
                                    v-model="operator">
                                <option disabled value="">Please select one
                                </option>
                                <option value="+">Addition</option>
                                <option value="-">Subtraction</option>
                                <option value="/">Division</option>
                                <option value="*">Multiply</option>
                            </select>
                        </div>
                        <button @click="equals" class="button is-dark mx-4">Get answer</button>
                        <button @click="equals" class="button is-warning">submit</button>
                    </div>
                    <h1 class="has-text-success is-size-7">Score:50</h1>
                </div>
            </section>

        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                valueA: 3,
                valueB: 4,
                answer: null,
                operator: "???",
                operators: ['-', '+', '*', '/'],
                operation: null,
            }
        },

        created: function () {
            this.getRandomNumber()
            this.randomiseOperator()
        },

        methods: {

            refresh() {
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
                this.answer = `${this.operation(parseFloat(this.valueA),parseFloat(this.valueB))}`;

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
                let selector = Math.floor(Math.random() * this.operators.length);
                this.operator = this.operators[selector]
                this.selectOperator()
            }

            

        }
    }
</script>

<style scoped>

    .area {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .input {
        width: 35%;
    }

    #operator {
        font-size: 60px;
    }

    #answer {
        width: 30%;
        margin: 0 auto;

    }


</style>
