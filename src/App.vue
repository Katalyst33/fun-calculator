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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
