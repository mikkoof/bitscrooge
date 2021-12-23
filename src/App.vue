<template>
  <date-picker @date-changed="date = $event" />
  <p>picked date: {{date}} </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DatePicker from "@/components/DatePicker.vue";

export default defineComponent({
  name: "App",
  components: { DatePicker },
  data() {
    return {
      date: 0,
    };
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
