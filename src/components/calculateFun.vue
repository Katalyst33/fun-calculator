<template>
    <div>
        <div>
            <h1 class="is-size-3 has-text-weight-bold">
                Calculator Game
            </h1>


            <section class="container mx-5 px-5 py-5">
                <div class="area">
                    <div class="box-1">
                        <h1 class="is-size-1">{{valueA}}</h1>
                    </div>
                    <div class="box-2">
                        <h1 id="operator"  class="is-size-1 has-text-danger">{{operation}}</h1>


                    </div>
                    <div class="box-3">
                        <h1 class="is-size-1">{{valueB}}</h1>

                    </div>
                    <div class="box-4">
                        <h1 class="is-size-1">=</h1>

                    </div>
                    <div class="box-5">
                        <h1 class="is-size-1">{{answer}}</h1>

                    </div>
                </div>

                <div class="py-5">

                    <div>
                        <div class="select mx-5">
                            <select v-model="operation">
                                <option value="select operator">Select operator</option>
                                <option value="+">+ (Addition)</option>
                                <option value="-">-(Subtraction)</option>
                                <option value="/">/(Division)</option>
                                <option value="*">*(Multiply)</option>
                            </select>
                        </div>
                        <button @click="calculate" class="button is-warning">Check</button>
                    </div>
                    <h1 class="has-text-success is-size-1">Score:50</h1>
                </div>
            </section>

        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                valueA:3,
                valueB:4,
                answer:null,
                operation:null
            }
        },


        methods:{
            calculate(){
                this.answer = ` ${this.valueA } ${this.operation} ${this.valueB}`

                console.log(this.answer)
            }

        }

    }
</script>

<style scoped>

    .area{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #operator{
        font-size: 200px;
    }


</style>
