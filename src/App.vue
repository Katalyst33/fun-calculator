<template>
    <div id="app">
        <Navbar/>
        <router-view/>
    </div>
</template>

<script>


    export default {
        name: 'App',

    }
</script>

<style>
    #app {
        font-family: 'Balsamiq Sans', cursive;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    html {
        font-family: 'Balsamiq Sans', cursive;
        background-color: #370047;
        background-image: url("/img/purple-rider.png");
        background-position: center;
        height: 100vh;
        background-repeat: no-repeat;
        /*background-size: cover;*/
        background-attachment: fixed;

    }

</style>
