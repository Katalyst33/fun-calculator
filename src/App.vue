<template>
    <div id="app">
        <calculate-fun/>


    </div>

</template>

<script>

    import calculateFun from "@/components/calculateFun";

    export default {
        name: 'App',
        components: {
            calculateFun
        }
    }
</script>

<style>
    #app {
        font-family: "Harabara Bold";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;

    }
    @font-face {
        font-family: "Harabara Bold";
        src: url("/fonts/ashcanbb_bold.ttf");

    }

    html {
        /*background-color: #00aa91;*/
        background-image: url("/img/purple-rider.png");
        background-position: center;
        height: 100vh;
        background-repeat: no-repeat;
        background-size: cover;
        /*background-attachment: fixed;*/

    }

</style>

