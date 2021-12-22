<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <ApiTest />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ApiTest from "./components/ApiTest.vue";

export default defineComponent({
  name: "App",
  components: {
    ApiTest,
  },
});
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
